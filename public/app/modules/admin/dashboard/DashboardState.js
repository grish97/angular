APP.config(function($stateProvider) {
    $stateProvider
        .state('dashboard',{
            url : '/admin/dashboard',
            views : {
                'header@' : {
                  templateUrl : 'app/modules/admin/_layout/views/_header.html',
                  controller : 'AdminHeaderController'
                },
                'sidebar@' : {
                    templateUrl : 'app/modules/admin/_layout/views/sidebar.html',
                    controller : 'SidebarController'
                },
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