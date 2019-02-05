APP.config(function($stateProvider) {
    $stateProvider
        .state('adminProducts', {
            url : '/admin/products',
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
                    templateUrl : 'app/modules/admin/AdminProducts/views/index.html',
                    controller : 'AdminProductController'
                }
            }
        })
        .state('product_edit', {
            url : '/:slug/edit',
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
                    templateUrl : 'app/modules/admin/AdminProducts/views/edit.html',
                    controller : 'AdminProductEditController'
                }
            }
        })
        .state('product_show', {
            url : '/:slug/show',
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
                    templateUrl : 'app/modules/admin/AdminProducts/views/show.html',
                    controller : 'AdminProductShowController'
                }
            }
        })
        .state('product_delete', {
            url : '/:slug/delete',
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
                    templateUrl : 'app/modules/admin/AdminProducts/views/delete.html',
                    controller : 'AdminProductDeleteController'
                }
            }
        })
});