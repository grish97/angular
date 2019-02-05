APP.controller('AdminDashboardController',function($scope,UsersService,ProductsService,$stateParams,$state) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    $scope.userCount = null;
    $scope.productCount = null;

    UsersService.get((res) => {
    	$scope.userCount = res.count;
    });

    ProductsService.get((res) => {
    	$scope.productCount = res.count;
    });

});
