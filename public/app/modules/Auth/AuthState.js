APP.config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url : "/login",
            views : {
                "content@" : {
                    templateUrl : '/app/modules/Auth/views/login.html',
                    controller :'AuthLoginController'
                }
                }
        })
        .state('register', {
            url : '/register',
            views : {
            'content@' : {
                templateUrl : '/app/modules/Auth/views/register.html',
                controller : 'AuthRegisterController'
        }
            }
        })
        .state('reset', {
            url : "/set-password/:token",
            views : {
                "content@" : {
                    templateUrl : "/app/modules/Auth/views/reset.html",
                    controller : "AuthResetController"
                }
            },
        })
        .state('forgot', {
            url : '/forgot',
            views : {
                'content@' : {
                    templateUrl : '/app/modules/Auth/views/forgot.html',
                    controller : 'AuthForgotController'
                }
                }
        })
        .state('verify', {
            url : '/verify/:token',
            views : {
                'content@' : {
                    controller : 'AuthVerificationController'
                }
            }
        });

});