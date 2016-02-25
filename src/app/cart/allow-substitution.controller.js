'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartAllowSusbtitueCtrl",['$scope','$uibModalInstance','HM_RestSV','HM_HeaderCnst',function( $scope, $uibModalInstance, RestSV,HeaderCnst){

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;

    $scope.doneSubstituteSelection = doneSubstituteSelection;

    function doneSubstituteSelection(){
      $uibModalInstance.close($scope.selectedSubstitute);
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
