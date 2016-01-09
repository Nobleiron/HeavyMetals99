'use strict';
angular.module("HM_JobSitesMD",['uiGmapgoogle-maps'])
  .config(
  ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProvider) {
    GoogleMapApiProvider.configure({
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'places'
    });

  }]
)
