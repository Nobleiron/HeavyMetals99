'use strict';
angular.module("HM_ShoppingCartMD")
  .constant("HM_ShoppingCartCnst",{
    details : {
      url : function(){
        return '/cart'
      }
    },
    delete : {
      url : function(){
        return '/cart'
      }
    }
  });
