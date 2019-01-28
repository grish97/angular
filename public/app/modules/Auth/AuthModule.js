APP.controller('AuthLoginController', function($scope,AuthService, toastr,$state) {
    $scope.user = {
        email : null,
        password : null,
    };

    $scope.login = function() {
        AuthService.login($scope.user, (res) => {
           if(res.access_token) {
               localStorage.setItem('api_token',res.access_token);
               $state.go('/');
           }
        }, (err) => {
            if(err.status === 401) {
                toastr.error('Email And Password incorect.')
            }
        });
    }
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
        },(err) => toastr.error('Fix errors'));
    };
});

APP.controller('AuthResetController', function ($stateParams,$scope,AuthService,toastr,$state) {
    $scope.user = {
        password : null,
        confirm_password : null,
        token : $stateParams.token
    };

    $scope.reset = function () {
        AuthService.setPassword($scope.user, (res) => {
            $scope.email = null;
            toastr.success('Successfully Reset.')
        }, (err) => toastr.error('Error'));
    };
});

APP.controller('AuthForgotController', function ($scope,$stateParams,AuthService,toastr,$state) {
   $scope.email = null;
   AuthService.reset({email : $scope.email},(res) =>  {
      $scope.email = null;
      toastr.success('Email Send!');
   }, (err) => console.log(err));
});

APP.controller('AuthVerificationController', function($stateParams,AuthService,toastr,$state) {
    AuthService.verify({token : $stateParams.token}, () => {
        toastr.success('You have successfully verified!');
        $state.go('login');
    },(err) => {
        $state.go('/');
    })
});
