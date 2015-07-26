'use strict';
angular.module("HM_ManageJobSitesMD",['uiGmapgoogle-maps'])
  .config(
  ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProvider) {
    GoogleMapApiProvider.configure({
      india: true
    });
  }]
);

