var app = angular.module('products-app', []);
app.controller('products-controller', ['$scope', '$http', function($scope, $http){

    $('#addProductModal').on('hide.bs.modal', function (event) {
        $scope.tempProduct = {};
    });
    $scope.products = [];

    //dirección de alojamiento del back end
    $scope.server = 'http://127.0.0.1:8000/'

    //con esta variable controlare el titulo de la modal
    $scope.modalTitle = 'Agregar Producto';


    //metodo encargado de obtener todos los productos en la base de datos
    $scope.getProducts = () => {
        return $http({
            method: 'GET',
            url: `${$scope.server}product`,
        });
    }

    $scope.getCategories = () => {
        return $http({
            method: 'GET',
            url: `${$scope.server}category`,
        });
    }

    //metodo encargado de obtener los datos base de la aplicación
    (function(){
        $scope.loading = true;
        $scope.getProducts().then((response) => {
            $scope.products = response.data;
            $scope.getCategories().then((response) => {
                $scope.categories = response.data;
                $scope.loading = false;
            });
        });
        
        
    })();

    //metodo encargado de guardar un producto, ya sea crear o actualizar
    $scope.saveProduct = () => {
        let tmpMethod = 'POST';
        let tmpUrl = `${$scope.server}product`
        if($scope.tempProduct.id) {
            tmpMethod = 'PUT';
            tmpUrl = `${$scope.server}product/${$scope.tempProduct.id}`
        }
        $http({
            method: tmpMethod,
            url: tmpUrl,
            data: $scope.tempProduct
        }).then(
            (response) => {
                if(response.data.success){
                    if(tmpMethod == 'POST'){
                        $scope.tempProduct.id = response.data.lastId;
                        $scope.products.unshift(response.data.data);
                    }else{
                        $scope.products[$scope.editingKey] = response.data.data;
                        delete $scope.editingKey;
                    }
                    iziToast.success({
                        title: 'OK',
                        message: 'El producto ha sido guardado satisfactoriamente',
                    });
                    $('#addProductModal').modal('hide');
                }else{
                    iziToast.error({
                        title: 'OK',
                        message: 'El producto no se ha podido guardar, por favor intente nuevamente o comuniquese con el área de soporte',
                    });
                } 
            },
            (error) => {

            }
        )
    }

    //metodo encargado de ingresar el producto a editar en el formulario
    $scope.editProduct = (product, key) => {
        $scope.modalTitle = 'Editar Producto';
        $scope.tempProduct = product;
        $scope.editingKey = key;
    }

    //metodo encargado de realizar la petición al servidor para eliminar un producto
    $scope.deleteProduct = (id, key) => {
        $http({
            method: 'DELETE',
            url: `${$scope.server}product/${id}`
        }).then((response) => {
            if(response.data.success){
                $scope.products.splice(key, 1);
                iziToast.success({
                    title: 'OK',
                    message: 'El producto ha sido Eliminado',
                });

            }else{
                iziToast.error({
                    title: 'OK',
                    message: 'El producto no se ha podido Eliminar, por favor intente nuevamente o comuniquese con el área de soporte',
                });
            } 
        })
    }

    $scope.sell = (id, key) => {
        $http({
            method: 'PATCH',
            url: `${$scope.server}product/${id}`
        }).then((response) => {
            if(response.data.success){
                $scope.products[key].stock--;
                $scope.products[key].sold_at = response.data.data;
                iziToast.success({
                    title: 'OK',
                    message: 'El producto ha sido Vendido',
                });

            }else{
                iziToast.error({
                    title: 'Error',
                    message: 'El producto no cuenta con stock suficiente para la venta',
                });
            } 
        })
    }
}]);