APP.controller('AuthLoginController', function() {

});

APP.controller('AuthRegisterController', function($scope, AuthService,toastr) {
    $scope.user = {
        name      : null,
        last_name : null,
        email     : null,
        password  : null
    };

    $scope.register = function () {
        AuthService.register($scope.user, (res) => {
            toastr.success('Successfully registered.');
        },(err) => console.log(err));
    };
});

APP.controller('AuthForgotController', function() {

});

APP.controller('AuthVerificationController', function($stateParams,AuthService,toastr,$state) {
    AuthService.verify({token : $stateParams.token}, () => {
        toastr.success('You have successfully verified.');
        $state.go('login');
    },(err) => {
        $state.go('/');
    })
});