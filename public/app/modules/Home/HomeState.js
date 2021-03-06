APP.config(function ($stateProvider) {
    $stateProvider
        .state('/', {
            url: "/",
            views: {
                'header@' : {
                    templateUrl: "/app/modules/_layout/views/_header.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Home/views/index.html",
                    controller: "HomeIndexController"
                },
                'footer@' : {
                    templateUrl : "/app/modules/_layout/views/_footer.html",
                    controller : "FooterController"
                }
            },
            data : {
                requiresLogin : true,
            }
        })
});