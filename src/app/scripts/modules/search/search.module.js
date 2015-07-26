'use strict';
angular.module("HM_SearchMD",['uiGmapgoogle-maps'])
  .config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider){

    uiGmapGoogleMapApiProvider.configure({
      china: true
    });


  }]);
