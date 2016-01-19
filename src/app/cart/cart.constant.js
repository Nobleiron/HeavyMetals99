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
        return '/cart/applyPromocode';
      }
    },
    updateDuration : {
      url : function(){
        return '/cart/date';
      }
    },
    steps : {
      summary : {
        complete : false,
        label : 'CART SUMMARY',
        od :1,
        path : 'hm.cart.details'
      },
      delivery : {
        complete : false,
        label : 'DELIVERY DETAILS',
        od :2,
        path : 'hm.cart.updateAddress'
      },
      duration : {
        complete : false,
        label : 'DURATION',
        od :3,
        path : 'hm.cart.cartDuration'
      },
      review : {
        complete : false,
        label : 'REVIEW ORDER',
        od :4,
        path : 'hm.cart.review'
      },
      payment : {
        complete : false,
        label : 'PAYMENT',
        od :5,
        path : 'hm.cart.payment'
      }
    },

    cartVersion: '1453150183109'
  });
