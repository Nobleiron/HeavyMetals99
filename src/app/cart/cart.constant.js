'use strict';
angular.module("HM_CartMD")
  .constant("HM_CartCnst",{
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
