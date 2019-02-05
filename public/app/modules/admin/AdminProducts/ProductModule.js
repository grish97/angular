APP.controller('AdminProductController', function ($scope,ProductsService,$stateParams) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    $scope.products = [];
    $scope.paginate = {};

    $scope.getProducts = function(page) {
       ProductsService.get({page : page}, (res) => {
           if (res.products) {
               $scope.products = res.products.data;
               $scope.paginate = {
                   last_page : new Array(res.products.last_page),
                   current_page : res.products.current_page
               }
           }
       },(err) => console.log(err));
    };

    $scope.getProducts(1);
});

APP.controller('AdminProductShowController', function ($scope, ProductsService, $stateParams) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    $scope.product = {};

    ProductsService.show({slug : $stateParams.slug}, (res) => {
        $scope.product = res.product;
    })
});

APP.controller('AdminProductEditController', function ($scope, ProductsService, CategoriesService, $stateParams, $state, Upload) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    const isEdit = $stateParams.slug != 0;
    $scope.text = !isEdit ? 'Create ' : 'Edit ';
    $scope.files = [];

    $scope.uploadFiles = function (files, slug) {
        if (files && files.length) {
            return Upload.upload({
                url: 'api/admin/products/images',
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

    CategoriesService.get({}, function (res) {
        $scope.categories = res.categories;
    });

    if(isEdit) {
        ProductsService.show({slug : $stateParams.slug}, (res) => {
            $scope.product = res.product;
        })
    }

    $scope.save = function () {
        if(isEdit) {
            $scope.uploadFiles($scope.files, $stateParams.slug);
            ProductsService.update({slug : $stateParams.slug}, $scope.product, (res) => {
                $state.go('adminProducts');
            })
        } else {
            ProductsService.store($scope.product, (res) => {
                $scope.uploadFiles($scope.files, res.slug).then(() => {
                    $state.go('adminProducts');
                });
            })
        }
    }
});

APP.controller('AdminProductDeleteController', function ($scope,ProductsService,$state,$stateParams,toastr) {
    $('[data-style="admin"]').removeAttr('disabled');
    $('[data-style="home"]').attr('disabled',true);
    $scope.delete = function () {
        ProductsService.delete({slug : $stateParams.slug}, (res) => {
            $state.go('adminProducts');
            toastr.success('Successfully Deleted.')
        })
    }
});