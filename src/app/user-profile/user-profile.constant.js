'use strict';
angular.module('HM_UserProfileMD')
  .constant('HM_UserProfileCnst', {
    details : {
      url : function(){
        return '/user'
      }
    },
    update : {
      url : function(){
        return '/user/update'
      }
    }

  });
