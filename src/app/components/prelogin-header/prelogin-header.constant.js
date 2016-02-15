'use strict';
angular.module('HeavyMetals')
  .constant('HM_PreloginHeaderCnst', {
    search : {
      url : function(){
        return '/products/search'
      }
    }
  });
