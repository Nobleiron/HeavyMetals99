'use strict';
angular.module('HeavyMetals')
  .constant('HM_HeaderCnst', {
    search : {
      url : function(){
        return '/products/search'
      }
    },
    CartDetails :{
      url : function(){
        return '/cart'
      }
    }
  });
