angular.module("HM_MyCatalogueMD")
.controller('HM_MyCatalogueCtrl', ['$scope','HM_RestSV','HM_MyCatalogueCnst', function($scope, RestSV, MyCatalogueCnst){


    $scope.removeFromWishList = removeFromWishList;

    $scope.flags = {
      noCatalogue : false
    }

    _initialize();

    function _initialize(){
      fetchMyCatelog();
    }


    function fetchMyCatelog(){
      $scope.catelogFetchInProgress= true;
      $scope.myCataloguePromise = RestSV.get(MyCatalogueCnst.list.url())
        .then(function(response){
          $scope.catelog = response.data.result.ProductList;
          $scope.flags.noCatalogue = !response.data.result
        })
        .catch(function(error){
          $scope.catelog = [];
        })
        .finally(function(){
          $scope.catelogFetchInProgress= false;
        })
    }

    function removeFromWishList(product){

      $scope.$broadcast('Add:Wishlist:Process:Start', product.Product_Id);
        RestSV
          .delete( MyCatalogueCnst.addToOrRemoveFromWishList.url(),{ data : {product_id : product.Product_Id }})
          .success(function(response){
            $scope.catelog.splice($scope.catelog.indexOf(product), 1)
          })
          .finally(function(){
            $scope.$broadcast('Add:Wishlist:Process:End',product.Product_Id)
          });

    }
}]);
