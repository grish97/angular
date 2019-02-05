APP.controller('AdminHeaderController', function ($scope, authManager,$state) {
    $scope.admin_logout = function ($event) {
        $event.preventDefault();
        localStorage.removeItem('api_admin_token');
        authManager.unauthenticate();
        $state.go('login');
    }
});

APP.controller('SidebarController', function ($stateParams) {
	
});
