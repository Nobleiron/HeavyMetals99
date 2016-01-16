'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDetailsCtrl",['$scope','HM_RestSV','HM_CartCnst','toastr', function( $scope,RestSV, ShoppingCartCnst,toastr){




    $scope.updateCart = updateCart;

    $scope.applyPromoCode = applyPromoCode;




    function updateCart(productId, cartData){
      if(!(/[1-9*]+/.test(cartData.qty))){
        return false;
      }
      if(cartData.isDirty){
        cartData.isDirty = false;
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

    }

    function applyPromoCode(){
      if($scope.promoCode){
        $scope.$broadcast('Cart:ApplyPromoCode:Start');
        RestSV.post(ShoppingCartCnst.applyPromoCode.url(),{
          coupon_code: $scope.promoCode
        })
          .then(function(response){
            if(response.data.result){
              $scope.cart = response.data.result.Cart_Content;
            }else{
              toastr.error("Invalid Coupon Code");
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
