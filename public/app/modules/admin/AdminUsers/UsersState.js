APP.config(function ($stateProvider) {
   $stateProvider
       .state('users', {
           url : '/admin/users',
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
                   templateUrl : 'app/modules/admin/AdminUsers/views/index.html',
                   controller : 'AdminUsersController'
               }
           },
           data : {
               requiresAdminLogin : true,
               isAdmin : true
           }
       })
       .state('users.edit', {
           url : '/:id/edit',
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
                   templateUrl : 'app/modules/admin/AdminUsers/views/edit.html',
                   controller : 'UserEditController'
               }
           }
       })
       .state('users.delete', {
           url : '/:id/delete',
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
                   templateUrl : 'app/modules/admin/AdminUsers/views/delete.html',
                   controller : 'UserDeleteController'
               }
           }
       })
});