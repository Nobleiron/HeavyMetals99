'use strict';
angular.module('HM_DashboardMD')
  .controller('HM_DashboardMainCtrl', function ($scope) {


    _initialize();


    function _initialize(){
      _fetchCatalogCount();
      _fetchJobsitesCount();
    }

    function _fetchCatalogCount(){

    }

    function _fetchJobsitesCount(){

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
