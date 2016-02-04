'use strict';
angular.module('HM_LandingMD')
    .controller('HM_LandingCtrl', ['$scope','$state','filterFilter','HM_SearchCnst','HM_RestSV','localStorageService', function ($scope, $state, filterFilter, landingCnst, RestSV, localStorageService) {

    $scope.oneAtATime = true;

    $scope.params.type = "rent";

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;

    $scope.toggleRentOrBuy = toggleRentOrBuy;


    $scope.fetchMostRentedProducts = fetchMostRentedProducts;

    $scope.flags = {
      mostRentedCategoryFetcing : true,
      mostRentedCategoryProductsFetcing : true
    };



    $scope.closeThis = function(){
      console.log("Closethis called")
    };

    _initialize();



    function fetchMostRentedProducts(category){
      $scope.flags.mostRentedCategoryProductsFetcing = true;
      category && ($scope.selectecMostRentedCategory = category);
      RestSV
        .get( landingCnst.productByCategory.url(),{category_id: $scope.selectecMostRentedCategory.Id})
        .then(function(response){
          $scope.mostRentedCategoryProducts = response.data.result.ProductList
          $scope.flags.mostRentedCategoryProductsFetcing = false;
        })
    }


    function selectSearchedItem(product){
      if(typeof $scope.selectedProduct == "object"){
        $scope.params.query = product.Product_Name;
      }
      if(typeof $scope.selectedProduct == "string"){
        $scope.params.query = $scope.selectedProduct;
      }
      $scope.params.page = 1;
      product && ($scope.params.category_id = product.Category_Id);
      $state.go('hm.search.results', $scope.params);
    }

    function getProducts(search){
      return RestSV.get( landingCnst.search.url() ,{
        search_text : search,
        type : $scope.params.type
      }).then(function(response){
        var filtered = filterFilter(response.data.result.ProductList, search);
        var results = _(filtered)
          .groupBy('Category_Name')
          .map(function (g) {
            g[0].firstInGroup = true;  // the first item in each group
            return g;
          })
          .flatten()
          .value();
        return results;
      });
    }

    function _initialize(){
      $scope.selectedProduct = '';
      $scope.flags = {
        rented : true
      };
      $scope.params.page = undefined;
      $scope.params.category_id = undefined;
      $scope.params.query = undefined;
      $scope.params.view_type = undefined;
      $scope.params.type = undefined;

      $scope.params.attributes = undefined;
      $scope.userObj = localStorageService.get('userObj');
      fetchEquipmentMenus();
      loadCategories()
        .then(function(){
          fetchMostRentedProducts();
        })

    }

    function fetchEquipmentMenus(){
      RestSV.get(landingCnst.categoryList.url() ,{
        type : 'rent'
      })
      .then(function(response){
        $scope.equipmentMenus = response.data.result.CategoryList;
      });
    }

    function toggleRentOrBuy(rented){
      $scope.flags.rented = rented;
      $scope.params.type = rented ? "rent" : "buy";
      console.log($scope.params.type);
    }


    function loadCategories(){
      $scope.flags.mostRentedCategoryFetcing = true;
      return RestSV
        .get( landingCnst.categoryList.url(),{type: 'rent'})
        .then(function(response){
          var rootCategories = response.data.result.CategoryList;
          $scope.flags.mostRentedCategoryFetcing = false;
          $scope.displayCategories = rootCategories[0].children;
          $scope.selectecMostRentedCategory = $scope.displayCategories[0];

        })
    }


    $scope.status= {
      isFirstOpen: true
    }

  }]);
