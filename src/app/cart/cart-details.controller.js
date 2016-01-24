'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDetailsCtrl",['$scope','$uibModal','HM_RestSV','HM_CartCnst','toastr', function( $scope,$uibModal,RestSV, ShoppingCartCnst,toastr){


    $scope.updateCart = updateCart;

    $scope.applyPromoCode = applyPromoCode;

    $scope.allowSubstitution = allowSubstitution;


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
            angular.merge($scope.data.cart,response.data.result.Cart_Content);
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
              $scope.data.cart = response.data.result.Cart_Content;
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


    function allowSubstitution(product, allowed){
      $scope.productToSubstitute = product;
      if(allowed){
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/app/cart/allow-substitution.html',
          scope : $scope,
          controller: 'HM_CartAllowSusbtitueCtrl'
        })
        modalInstance.opened.then(function(){

        });

        modalInstance.result.then(function (selectedItem) {
          debugger
        }, function () {
          debugger
        });
      }else{

      }
    }


  }]);
