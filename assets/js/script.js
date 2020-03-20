var app = angular.module('app-users', []);
app.controller('app-controller', ['$scope', '$http', function($scope, $http){

    $('#addEmployeeModal').on('hide.bs.modal', function (event) {
        $scope.tempUser = {};
    });
    $scope.users = [];
    $scope.modalTitle = 'Agregar Usuario';
    $scope.get = () => {
        $http({
            method: 'GET',
            url: 'get',
        }).then((response) => {
            $scope.users = response.data;
        });
    }
    $scope.get();
    $scope.saveUser = () => {
        let tmpUrl = 'add';
        if($scope.tempUser.id) tmpUrl = 'edit'
        $http({
            method: 'POST',
            url: tmpUrl,
            data: $scope.tempUser
        }).then(
            (response) => {
                if(response.data.success){
                    if(tmpUrl == 'add'){
                        $scope.tempUser.id = response.data.lastId;
                        $scope.users.unshift($scope.tempUser);
                    }
                    iziToast.success({
                        title: 'OK',
                        message: 'El usuario ha sido guardado satisfactoriamente',
                    });
                    $('#addEmployeeModal').modal('hide');
                }else{
                    iziToast.error({
                        title: 'OK',
                        message: 'El usuario no se ha podido guardar, por favor intente nuevamente o comuniquese con el área de soporte',
                    });
                } 
            },
            (error) => {

            }
        )
    }
    $scope.editUser = (user) => {
        $scope.modalTitle = 'Editar Usuario';
        $scope.tempUser = user;
    }

    $scope.deleteUser = (id, key) => {
        $http({
            method: 'DELETE',
            url: 'delete',
            data: id
        }).then((response) => {
            if(response.data.success){
                $scope.users.splice(key, 1);
                iziToast.success({
                    title: 'OK',
                    message: 'El usuario ha sido Eliminado',
                });

            }else{
                iziToast.error({
                    title: 'OK',
                    message: 'El usuario no se ha podido Eliminar, por favor intente nuevamente o comuniquese con el área de soporte',
                });
            } 
        })
    }
}]);