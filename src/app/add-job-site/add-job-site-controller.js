'use strict';
angular.module("HM_ManageJobSitesMD")
  .controller('HM_AddJobSiteCtrl', ['$scope', function($scope){

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.randomMarkers = [{ id : 34,latitude: 21, longitude: 78 }]

  }]);