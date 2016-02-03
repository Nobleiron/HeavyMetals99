'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartAllowSusbtitueCtrl",['$scope','$modalInstance','HM_RestSV','HM_HeaderCnst','productToAllowSubstitute',function( $scope, $modalInstance, RestSV,HeaderCnst,productToAllowSubstitute){

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;

    $scope.doneSubstituteSelection = doneSubstituteSelection;

debugger
    function doneSubstituteSelection(){
      $modalInstance.close($scope.selectedSubstitute);
    }

    function selectSearchedItem(product){
      $scope.query = product.Product_Name;
      $scope.selectedSubstitute = product;
    }


    function getProducts(val){
      return RestSV.post( HeaderCnst.search.url() ,{
        search_text : val
      }).then(function(response){
        if(response.data.result == ""){
          return [];
        }
        return response.data.result.ProductList.map(function(item){
          return item;
        });
      });
    }



  }]);
