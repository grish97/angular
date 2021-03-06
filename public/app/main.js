const APP = angular.module('app', ['ui.router', 'ngResource', 'ngAnimate', 'toastr', 'angular-jwt', 'ngFileUpload']);


APP.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

APP.config(function Config(toastrConfig, jwtOptionsProvider, $httpProvider) {

    angular.extend(toastrConfig, {
        allowHtml: true,
        closeButton: true,
        extendedTimeOut: 1000,
        progressBar: true,
        tapToDismiss: true,
        timeOut: 5000
    });

    jwtOptionsProvider.config({
        unauthenticatedRedirectPath: '/login',
        tokenGetter: ['options', function(options) {
            if (options && options.url.indexOf('admin') > -1) {
                return localStorage.getItem('api_admin_token');
            } else {
                return localStorage.getItem('api_token');
            }
        }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
});

APP.run(function ($rootScope, $state, authManager, $transitions) {
    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();

    $rootScope.$on('tokenHasExpired', function() {
        localStorage.removeItem('api_token');
        alert('Your token is expired.');
    });

    $transitions.onEnter({}, function(transition, state) {
        if(state.data && state.data.isAdmin && state.data.requiresAdminLogin === false) {
            let token = localStorage.getItem('api_admin_token');
            if(token !== null) {
                return transition.router.stateService.target('dashboard');
            }
        }

        if(state.data && state.data.requiresLogin === false) {
            let token = localStorage.getItem('api_token');

            if(token !== null) {
                return transition.router.stateService.target('/');
            }
        }
    });
});
APP.factory('errorInterceptors', ['$injector', function($injector) {
    let service = {};

    service.responseError = function(response) {
        if(response.status === 422) {
            let toastr = $injector.get('toastr');
            let errorText = '';
            Object.values(response.data.errors).map(function(item) {
                errorText += item.join('<br>') + '<br>';
            });

            toastr.error(errorText);
        }

        throw response;
    };

    return service;
}]);


APP.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptors');
}]);

//
// APP.directive('person', function() {
//     return {
//         restrict: 'C',
//         template: function(elem, attr) {
//             console.log(elem);
//             return 'customer-' + attr.name;
//         },
//         link : function (scope, element, attrs) {
//             $(element).addClass('gago');
//
//             $(element).click(function () {
//                 console.log('clciked');
//             })
//         }
//     };
// });