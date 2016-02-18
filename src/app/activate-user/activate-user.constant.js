'use strict';
angular.module("HM_ActivateUserMD")
  .constant("HM_ActivateUserCnst",{
    activate : {
      url : function(){
        return '/registration/activate'
      }
    }
  });
