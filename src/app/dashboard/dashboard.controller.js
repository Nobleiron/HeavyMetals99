'use strict';
angular.module('HM_DashboardMD')
  .controller('HM_DashboardCtrl', function ($scope, localStorageService) {

    $scope.showFilter = false;
    $scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }

    $scope.upcomingEquipmentBookings = [{
      name : 'Equipment Name',
      bookedAt : new Date()
    },
      {
        name : 'Equipment Name',
        bookedAt : new Date()
      },
      {
        name : 'Equipment Name',
        bookedAt : new Date()
      },
      {
        name : 'Equipment Name',
        bookedAt : new Date()
      }];
    $scope.equipmentNearingEndPeriod = [{
      name : 'Equipment Name',
      bookedAt : new Date()
    },
      {
        name : 'Equipment Name',
        bookedAt : new Date()
      },
      {
        name : 'Equipment Name',
        bookedAt : new Date()
      },
      {
        name : 'Equipment Name',
        bookedAt : new Date()
      }];
  });
