'use strict';
angular.module("HM_ShoppingCartMD")
  .controller("HM_ShoppingCartCtrl",['$scope','$http','HM_RestSV','HM_ShoppingCartCnst', function( $scope,$http, RestSV, ShoppingCartCnst ){


    $scope.deleteProductFromCart = deleteProductFromCart;

    _initialize();

    function _initialize(){
      $scope.cartFetchInProgress = true;
      RestSV.get(ShoppingCartCnst.details.url())
        .then(function(response){

          $scope.cart = response.data.result.Cart_Content;

        })
        .catch(function(error){

        })
        .finally(function(){
          $scope.cartFetchInProgress = false;
        })
    }


    function deleteProductFromCart(id){

      RestSV.delete(ShoppingCartCnst.delete.url(),{
        params :{proid: id},
        data :{proid: id},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(function(response){
          $scope.cart = response.data.result.Cart_Content;

        })
        .catch(function(error){
          debugger
        })
    }


  }]);
