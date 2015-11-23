'use strict';
angular.module('HM_LandingMD')
  .constant('HM_LandingCnst', {
    search : {
      url : function(){
        return '/products/search'
      }
    },
    categories : {
      url : function(){
        return '/category'
      }
    }
  });
