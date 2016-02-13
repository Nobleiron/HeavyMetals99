'use strict';
angular.module('HM_RequestsMD')
  .constant('HM_RequestsCnst', {
    pickUpRequests : {
      url : function(){
        return '/portal/viewPickupItem'
      }
    },
    serviceRequests :{
      url : function(){
        return '/portal/contactListForServiceRequset'
      }
    }
  });
