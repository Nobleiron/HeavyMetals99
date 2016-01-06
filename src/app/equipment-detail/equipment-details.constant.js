'use strict';
angular.module("HM_EquipmentDetailMD")
  .constant("HM_EquipmentDetailCnst",{
    details : {
      url : function(){
        return '/products/product'
      }
    },
    addToOrRemoveFromWishList : {
      url : function(){
        return '/catelog'
      }
    }
  });
