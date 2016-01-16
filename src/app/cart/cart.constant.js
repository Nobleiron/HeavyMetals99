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
    },
    steps : [
      {
        name : 'summary',
        label : 'CART SUMMARY',
        od :1,
        path : 'hm.cart.details',
      },
      {
        name : 'delivery',
        label : 'DELIVERY DETAILS',
        od :2,
        path : 'hm.cart.updateAddress'
      },
      {
        name : 'duration',
        label : 'DURATION',
        od :3,
        path : 'hm.cart.cartDuration'
      },
      {
        name : 'review',
        label : 'REVIEW ORDER',
        od :4,
        path : 'hm.cart.review'
      },
      {
        name : 'payment',
        label : 'PAYMENT',
        od :5,
        path : 'hm.cart.payment'
      }
    ]
  });
