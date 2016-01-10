'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDetailsCtrl",['$scope','HM_RestSV','HM_CartCnst','toastr', function( $scope,RestSV, ShoppingCartCnst,toastr){


    $scope.deleteProductFromCart = deleteProductFromCart;

    $scope.updateCart = updateCart;

    $scope.applyPromoCode = applyPromoCode;


    _initialize();

    function _initialize(){


    }




    function deleteProductFromCart(id,cartData){
      cartData.deleteInProgress = true;
      RestSV.delete(ShoppingCartCnst.delete.url(),{
        data : {proid: id}})
        .then(function(response){
          angular.merge($scope.cart,response.data.result.Cart_Content);

          toastr.info("Item removed from cart");
        })
        .finally(function(error){
          cartData.deleteInProgress = false;
        })
    }

    function updateCart(productId, cartData){
      cartData.updateInProgress = true;
      RestSV.put(ShoppingCartCnst.updateQty.url(),{
        proid: productId,
        qty : cartData.qty
      })
        .then(function(response){
          angular.merge($scope.cart,response.data.result.Cart_Content);
        })
        .finally(function(){
          cartData.updateInProgress = false;
        })
    }

    function applyPromoCode(){
      if($scope.promoCode){
        $scope.$broadcast('Cart:ApplyPromoCode:Start');
        RestSV.post(ShoppingCartCnst.applyPromoCode.url(),{
          coupon_code: $scope.promoCode
        })
          .then(function(response){
            if(response.data.result){
              // $scope.cart = response.data.result.Cart_Content;
            }
          })
          .catch(function(){
            toastr.error("Invalid Coupon Code");
          })
          .finally(function(){
            $scope.$broadcast('Cart:ApplyPromoCode:End');
          })
      }
    }


  }]);
