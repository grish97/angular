APP.config(function ($stateProvider) {
    $stateProvider
        .state('products', {
            url: "/products",
            views: {
                'header@' : {
                    templateUrl: "/app/modules/_layout/views/_header.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Product/views/index.html",
                    controller: "ProductIndexController"
                }
            },
            data: {
                isAdmin : false,
                requiresLogin: true
            }
        })

        .state('products.show', {
            url: "/:slug/show",
            views: {
                'header@' : {
                    templateUrl: "/app/modules/_layout/views/_header.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Product/views/show.html",
                    controller: "ProductShowController"
                }
            },
            data: {
                isAdmin : false,
                requiresLogin: true
            }
        })

        .state('products.edit', {
            url: "/:slug/edit",
            views: {
                'header@' : {
                    templateUrl: "/app/modules/_layout/views/_header.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Product/views/edit.html",
                    controller: "ProductEditController"
                }
            },
            data: {
                isAdmin : false,
                requiresLogin: true
            }
        })

        .state('products.delete', {
            url: "/:slug/delete",
            views: {
                'header@' : {
                    templateUrl: "/app/modules/_layout/views/_header.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Product/views/delete.html",
                    controller: "ProductDeleteController"
                }
            },
            data: {
                isAdmin : false,
                requiresLogin: true
            }
        })
        .state('my_product', {
            url : '/myProduct',
            views : {
                 'header@' : {
                    templateUrl: "/app/modules/_layout/views/_header.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Product/views/myProduct.html",
                    controller: "MyProductController"
                }
            },
            data : {
                isAdmin : false,
                requiresLogin : true
            }
        })
})