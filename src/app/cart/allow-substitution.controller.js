'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartAllowSusbtitueCtrl",['$scope','HM_RestSV','HM_HeaderCnst','filterFilter',function( $scope,RestSV,HeaderCnst,filterFilter){

    $scope.showAutocomplete = false;

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;

    function selectSearchedItem(product){
      $scope.showAutocomplete = false;
    }


    function getProducts(search){
      return RestSV.get( HeaderCnst.search.url() ,{
        search_text : search,
      }).then(function(response){
        if($scope.showAutocomplete){
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
        }

      });
    }


  }]);
