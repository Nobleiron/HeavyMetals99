'use strict';
angular.module('HM_MyCatalogueMD')
  .constant('HM_MyCatalogueCnst', {
    list : {
      url : function(){
        return '/catelog'
      }
    },
    addToOrRemoveFromWishList : {
      url : function(){
        return '/catelog'
      }
    }
  });
