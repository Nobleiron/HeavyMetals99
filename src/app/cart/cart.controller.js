'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartCtrl",['$scope','HM_RestSV', 'HM_CartCnst', function( $scope,RestSV,ShoppingCartCnst ){

  $scope.cartData = {};

    console.log($scope.cartData);
    $scope.cartFetchInProgress = true;
    RestSV.get(ShoppingCartCnst.details.url())
      .then(function(response){
        $scope.cart = response.data.result.Cart_Content;
        $scope.cart && $scope.cart.Product && $scope.cart.Product.forEach(function(product){
          if(!$scope.cartData[product.Product_id]){
            $scope.cartData[product.Product_id] = { qty: product.Product_quantity}
          }
        })

      })
      .catch(function(error){
        debugger
      })
      .finally(function(){
        $scope.cartFetchInProgress = false;
      })

  }]);
