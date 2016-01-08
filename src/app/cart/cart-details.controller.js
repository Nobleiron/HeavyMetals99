'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDetailsCtrl",['$scope','HM_RestSV','HM_CartCnst', function( $scope,RestSV, ShoppingCartCnst){


    $scope.deleteProductFromCart = deleteProductFromCart;

    $scope.updateCart = updateCart;


    _initialize();

    function _initialize(){
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
        })
        .finally(function(){
          $scope.cartFetchInProgress = false;
        })

      console.log($scope.cartData);
    }




    function deleteProductFromCart(id){
      RestSV.delete(ShoppingCartCnst.delete.url(),{
        data : {proid: id}})
        .then(function(response){
          $scope.cart = response.data.result.Cart_Content;
        })
        .catch(function(error){
        })
    }

    function updateCart(product){
      RestSV.put(ShoppingCartCnst.updateQty.url(),{
        proid: product.id,
        qty : 1
      })
        .then(function(response){
          debugger
        })
        .catch(function(error){
          debugger
        })
    }


  }]);
