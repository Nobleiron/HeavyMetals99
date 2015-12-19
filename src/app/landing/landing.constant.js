'use strict';
angular.module('HM_LandingMD')
  .constant('HM_LandingCnst', {
    search : {
      url : function(){
        return '/products/search'
      }
    },
    categoryList : {
      url : function(){
        return '/category'
      }
    }
  });
