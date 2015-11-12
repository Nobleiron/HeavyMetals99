'use strict';
angular.module('HM_SearchMD')
  .constant('HM_SearchCnst', {
    search : {
      url : function(){
        return '/products/search'
      }
    },
    categoryList : {
      url : function(){
        return '/category'
      }
    },
    addToWishList : {
      url : function(){
        return '/catelog'
      }
    }
  });
