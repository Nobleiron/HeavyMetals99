'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDetailsCtrl",['$scope','$uibModal','HM_RestSV','HM_CartCnst','toastr', function( $scope,$uibModal,RestSV, ShoppingCartCnst,toastr){


    $scope.updateCart = updateCart;

    $scope.applyPromoCode = applyPromoCode;

    $scope.selectedSubstitute = {};

    //$scope.allowSubstitution = {
    //  closeEl: '.close',
    //  overlay: {
    //    templateUrl: '/app/cart/allow-substitute-flyout.html'
    //  }
    //};

    $scope.resetQuantity = resetQuantity;

    $scope.allowSubstitution = allowSubstitution;



    function resetQuantity(model, form){
      model.qty = model.originalQuantity;
      form.$setPristine();
    }


    function allowSubstitution(product){
      $scope.productToAllowSubstitute = product;
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/app/cart/allow-substitution.html',
          controller: 'HM_CartAllowSusbtitueCtrl',
          resolve : {
            productToAllowSubstitute : function(){
              return product;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
          RestSV.post(ShoppingCartCnst.allowSubstitution.url(),{
            product_id: product.Product_id,
            substitute : [{product_id : selectedItem.Product_Id, preference : 1}]
          })
            .then(function(){
              toastr.success("Substitute preference saved");
            })
            .catch(function(){
              toastr.error("Failed to save substitute preference");
            })
        });

    }

    function updateCart(productId, cartData, productForm){
      if(!(/[1-9*]+/.test(cartData.qty))){
        return false;
      }
      //if(cartData.isDirty){
      //  cartData.isDirty = false;
        cartData.updateInProgress = true;
        RestSV.put(ShoppingCartCnst.updateQty.url(),{
          proid: productId,
          qty : cartData.qty
        })
          .then(function(response){
            cartData.originalQuantity = cartData.qty;
            angular.merge($scope.data.cart,response.data.result.Cart_Content);
          })
          .finally(function(){
            productForm.$setPristine();
            cartData.updateInProgress = false;
          })
      //}

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


  }]);
