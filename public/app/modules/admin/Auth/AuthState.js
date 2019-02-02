APP.config(function($stateProvider) {
    $stateProvider
        .state('admin',{
            url : '/admin',
            views : {
                'content@' : {
                    templateUrl : 'app/modules/admin/Auth/views/index.html',
                    controller : 'AdminAuthController'
                }
            },
            data : {
                isAdmin : true,
                requiresAdminLogin : false,
            }
        })
});