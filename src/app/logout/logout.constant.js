'use strict';
angular.module('HM_LogoutMD')
  .constant('HM_logoutCnst', {
    logout : {
      url : function(){
        return '/Logout'
      }
    }
  });
