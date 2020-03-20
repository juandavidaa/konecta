var app = angular.module('products-app', []);
app.controller('products-controller', ['$scope', '$http', function($scope, $http){

    $('#addProductModal').on('hide.bs.modal', function (event) {
        $scope.tempProduct = {};
    });
    $scope.products = [];

    //con esta variable controlare el titulo de la modal
    $scope.modalTitle = 'Agregar Producto';


    //metodo encargado de obtener todos los productos en la base de datos
    $scope.get = () => {
        $http({
            method: 'GET',
            url: 'get',
        }).then((response) => {
            $scope.products = response.data;
        });
    }
    $scope.get();
    $scope.saveProduct = () => {
        let tmpUrl = 'add';
        if($scope.tempProduct.id) tmpUrl = 'edit'
        $http({
            method: 'POST',
            url: tmpUrl,
            data: $scope.tempProduct
        }).then(
            (response) => {
                if(response.data.success){
                    if(tmpUrl == 'add'){
                        $scope.tempProduct.id = response.data.lastId;
                        $scope.products.unshift($scope.tempProduct);
                    }
                    iziToast.success({
                        title: 'OK',
                        message: 'El producto ha sido guardado satisfactoriamente',
                    });
                    $('#addEmployeeModal').modal('hide');
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
    $scope.editProduct = (product) => {
        $scope.modalTitle = 'Editar Producto';
        $scope.tempProduct = product;
    }

    $scope.deleteProduct = (id, key) => {
        $http({
            method: 'DELETE',
            url: 'delete',
            data: id
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
}]);