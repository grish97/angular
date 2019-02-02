APP.config(function($stateProvider) {
    $stateProvider
        .state('dashboard',{
            url : '/admin/dashboard',
            views : {
                'content@' : {
                    templateUrl : 'app/modules/admin/dashboard/views/index.html',
                    controller : 'AdminDashboardController'
                }
            },
            data: {
                requiresAdminLogin : true,
                isAdmin : true
            }
        })
});