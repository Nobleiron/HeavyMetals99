'use strict';
angular.module('HM_LandingMD')
  .controller('HM_LandingCtrl', ['$scope','$state','filterFilter','HM_LandingCnst','HM_RestSV', function ($scope, $state, filterFilter, landingCnst, RestSV ) {


    $scope.defaultSearchType = "rent";

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;

    $scope.toggleRentOrBuy = toggleRentOrBuy;

    _initialize();

    function selectSearchedItem(item, model, label){
      var query = '';
      if(typeof $scope.selectedProduct == "object"){
        query = $scope.selectedProduct.Product_Name;
      }
      if(typeof $scope.selectedProduct == "string"){
        query = $scope.selectedProduct;
      }

      $state.go('hm.search', { query : query});
    }

    function getProducts(search){
      return RestSV.get( landingCnst.search.url() ,{
        search_text : 'lift',
        type : $scope.defaultSearchType
      }).then(function(response){
        var filtered = filterFilter(response.data.result.SearchResult, search);
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
      fetchEquipmentMenus();
    }

    function fetchEquipmentMenus(){
      RestSV.get(landingCnst.categories.url() ,{
        type : 'rent'
      })
      .then(function(response){
        $scope.equipmentMenus = response.data.result.CategoryList;
      });
    }

    function toggleRentOrBuy(rented){
      $scope.flags.rented = rented;
      $scope.defaultSearchType = rented ? "rent" : "buy";
    }

  }]);
