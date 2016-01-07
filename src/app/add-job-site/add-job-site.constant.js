'use strict';
angular.module("HM_ManageJobSitesMD")
  .constant("HM_AddJobSiteCnst",{
    add : {
      url : function(){
        return '/jobsiteaddress'
      }
    }
  });
