'use strict';
angular.module("HM_ManageJobSitesMD",['uiGmapgoogle-maps'])
  .config(
  ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProvider) {
    GoogleMapApiProvider.configure({
      india: true
    });

  }]
).run(['$templateCache', function ($templateCache) {
    //$templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
    //$templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
  }])

