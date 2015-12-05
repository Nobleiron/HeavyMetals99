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
    productByCategory : {
      url : function(){
        return  '/products/category'
      }
    },
    addToWishList : {
      url : function(){
        return '/catelog'
      }
    },
    categoryDisplaySortOrder : {
      'Equipment' : 1,
      'Accessories' : 2,
      'Attachments' : 3,
      'Parts' : 4
    }
  });
