'use strict';
angular.module('HM_DashboardMD')
  .controller('HM_DashboardMainCtrl', function ($scope) {
    debugger
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
