'use strict';
angular.module('HM_LandingMD')
  .controller('HM_LandingCtrl', ['$scope','$state','filterFilter','HM_LandingCnst','HM_RestSV','localStorageService', function ($scope, $state, filterFilter, landingCnst, RestSV, localStorageService) {

    $scope.oneAtATime = true;

    $scope.params.type = "rent";

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;

    $scope.toggleRentOrBuy = toggleRentOrBuy;


    $scope.closeThis = function(){
      console.log("Closethis called")
    };

    _initialize();

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
      loadCategories();
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
      return RestSV
        .get( landingCnst.categoryList.url(),{type: 'rent'})
        .then(function(response){
          var rootCategories = response.data.result.CategoryList;
          $scope.displayCategories = rootCategories[0].children;
        })
    }


    $scope.status= {
      isFirstOpen: true
    }

  }]);
