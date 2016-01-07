angular.module("HM_MyCatalogueMD")
.controller('HM_MyCatalogueCtrl', ['$scope','HM_RestSV','HM_MyCatalogueCnst', function($scope, RestSV, MyCatalogueCnst){


    $scope.addToOrRemoveFromWishList = addToOrRemoveFromWishList;

    _initialize();

    function _initialize(){
      fetchMyCatelog();
    }


    function fetchMyCatelog(){
      $scope.catelogFetchInProgress= true;
      RestSV.get(MyCatalogueCnst.list.url())
        .then(function(response){
          $scope.catelog = response.data.result.ProductList;
          $scope.catelogFetchInProgress= false;
        })
        .catch(function(error){
        })
    }

    function addToOrRemoveFromWishList(product){
      $scope.$broadcast('Add:Wishlist:Process:Start', product.Product_Id);
      if(product.Is_in_catelog){
        RestSV
          .delete( MyCatalogueCnst.addToOrRemoveFromWishList.url(),{ params : {product_id : product.Product_Id }})
          .success(function(response){
            product.Is_in_catelog = false;
            $scope.catelog = false;
          })
          .finally(function(){
            $scope.$broadcast('Add:Wishlist:Process:End',product.Product_Id)
          });
      }else{
        RestSV
          .post( MyCatalogueCnst.addToOrRemoveFromWishList.url(),{ product_id : product.Product_Id })
          .success(function(response){
            product.Is_in_catelog = true;
            $scope.catelog = true;
          })
          .finally(function(){
            $scope.$broadcast('Add:Wishlist:Process:End',product.Product_Id)
          });
      }

    }
}]);
