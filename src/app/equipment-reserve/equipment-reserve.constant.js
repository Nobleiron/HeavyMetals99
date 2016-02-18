'use strict';
angular.module("HM_EquipmentReserveMD")
  .constant("HM_EquipmentReserveCnst",{
    details : {
      url : function(){
        return '/products/product/'
      }
    },
    addToCart : {
      url : function(){
        return '/cart'
      }
    }
  });
