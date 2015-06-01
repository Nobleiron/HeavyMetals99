'use strict';
angular.module("HM_ManageJobSitesMD")
  .controller('HM_ManageJobSitesCtrl', ['$scope', function($scope){

    $scope.map = { center: { latitude: 21, longitude: 78 }, zoom: 8 };

    $scope.randomMarkers = [{ id : 34,latitude: 21, longitude: 78 }]

  }]);
