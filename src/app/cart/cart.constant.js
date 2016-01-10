'use strict';
angular.module("HM_CartMD")
  .constant("HM_CartCnst",{
    details : {
      url : function(){
        return '/cart';
      }
    },
    delete : {
      url : function(){
        return '/cart';
      }
    },
    updateQty : {
      url : function(){
        return '/cart';
      }
    },
    applyPromoCode : {
      url : function(){
        return '/cart/applyPromocode'
      }
    }
  });
