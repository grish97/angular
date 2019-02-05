APP.controller('ProductIndexController', function ($scope, ProductService) {
    $scope.products = [];
    $scope.pagination = {};
    $scope.countList = 0;
    $scope.getProducts = function(page) {
        ProductService.get({page : page}, (res) => {
            $scope.products = res.products.data;
            $scope.pagination = {
                last_page : new Array(res.products.last_page),
                currentPage : res.products.current_page
            }
        })
    };

    $scope.getProducts(1);

    $scope.wish = function($event) {
        let elem = $($event.target),
            activeClass = $($event.target).attr('class');
        if(activeClass === 'far fa-heart') {
           $scope.countList++;
            elem.removeClass('far fa-heart').addClass('fas fa-heart text-danger');
        }else {
             $scope.countList--;
            elem.removeClass('fas fa-heart text-danger').addClass('far fa-heart');    
        }
        $('.countList').addClass('countBl').text($scope.countList);
    };

    $scope.addToCard = function ($event) {
        let product = $($event.target).closest('.product').clone(),
            cardBlock = $('.cardBlock');
        cardBlock.prepend(product);
        let count = cardBlock.find('.product').length;
        $('.countCard').addClass('countBl').text(count);
        console.log(count)
    }
});

APP.controller('ProductShowController', function ($scope, ProductService, $stateParams) {
    $scope.product = {};
    ProductService.show({slug : $stateParams.slug}, (res) => {
        $scope.product = res.product;
    });

});

APP.controller('ProductEditController', function ($scope, ProductService, CategoryService, $stateParams, $state, Upload) {
    const isEdit = $stateParams.slug != 0;
    $scope.text = !isEdit ? 'Create ' : 'Edit ';
    $scope.files = [];

    $scope.uploadFiles = function (files, slug) {
        if (files && files.length) {
            return Upload.upload({
                url: 'api/products/images',
                data: {
                    file: files,
                    slug : slug
                }
            });
        }
    };

    $scope.categories = [];

    $scope.product = {
        category_id : ''
    };

    CategoryService.get({}, function (res) {
        $scope.categories = res.categories;
    });

    if(isEdit) {
        ProductService.show({slug : $stateParams.slug}, (res) => {
            $scope.product = res.product;
        })
    }

    $scope.save = function () {
        if(isEdit) {
            $scope.uploadFiles($scope.files, $stateParams.slug);
            ProductService.update({slug : $stateParams.slug}, $scope.product, (res) => {
                $state.go('products');
            })
        } else {
            ProductService.store($scope.product, (res) => {
                $scope.uploadFiles($scope.files, res.slug).then(() => {
                    $state.go('products');
                });

            })
        }
    }
});

APP.controller('ProductDeleteController', function ($scope, $stateParams, ProductService, $state, toastr) {
    $scope.delete = function () {
        ProductService.delete({slug : $stateParams.slug}, (res) => {
            $state.go('products');
            toastr.success('Successfully Deleted.')
        })
    }
});

// APP.controller('MyProductController', function ($scope,$stateParams,ProductService) {
//     ProductService.myProduct();
    
// });