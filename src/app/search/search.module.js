'use strict';
angular.module("HM_SearchMD",['uiGmapgoogle-maps','HM_ScrollTopMD'])
  .config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider){

    uiGmapGoogleMapApiProvider.configure({
      china: true
    });


  }]);
