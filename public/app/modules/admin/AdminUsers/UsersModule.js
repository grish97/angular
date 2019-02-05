APP.controller('AdminUsersController', function ($scope,UsersService) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    $scope.users = [];
    $scope.paginate = {};

    $scope.getUsers = function(page) {
        UsersService.get({page : page},(res) => {
            if (res) {
                $scope.users = res.users.data;

                $scope.paginate = {
                    last_page : new Array(res.users.last_page),
                    current_page : res.users.current_page
                };
            }
        });
    };
    $scope.getUsers(1);
});

APP.controller('UserEditController', function ($scope,AuthService,UsersService,$stateParams, toastr,$state) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    const isEdit = $stateParams.id != 0;
          $scope.text = !isEdit ? "Create" : "Edit";
    $scope.user = null;

    if (isEdit) {
        UsersService.show({id : $stateParams.id}, (res) => {
            $scope.user = res.user;
        })
    }

    $scope.save = function () {
        if (isEdit) {
            UsersService.update({id : $stateParams.id}, $scope.user,(res) => {
                toastr.success('Successfully save.');
                $state.go('users');
            },(err) => console.log(err));
        }else {
            AuthService.register($scope.user, (res) => {
                toastr.success('Successfully save.');
                $state.go('users');
            }, (err) => console.log(err));
        }
    }

});

APP.controller('UserDeleteController', function ($scope, UsersService,$stateParams,$state,toastr) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    $scope.delete = function () {
        UsersService.delete({id : $stateParams.id}, (res) => {
            $state.go('users');
            toastr.success('Successfully deleted.');
        });
    }
});