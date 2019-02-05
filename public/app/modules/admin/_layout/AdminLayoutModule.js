APP.controller('AdminHeaderController', function ($scope, authManager) {
    $scope.admin_logout = function ($event) {
        $event.preventDefault();
        localStorage.removeItem('api_admin_token');
        authManager.unauthenticate();
    }
});

APP.controller('SidebarController', function ($stateParams) {
	
});