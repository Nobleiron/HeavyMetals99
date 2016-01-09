'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDetailsCtrl",['$scope','HM_RestSV','HM_CartCnst', function( $scope,RestSV, ShoppingCartCnst){


    $scope.deleteProductFromCart = deleteProductFromCart;

    $scope.updateCart = updateCart;


    _initialize();

    function _initialize(){


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
