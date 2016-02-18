'use strict';
angular.module("HM_QuoteDetailsMD")
  .constant("HM_QuoteDetailsCnst",{
    details : {
      url : function(){
        return '/orders/order';
      }
    }
  });
