'use strict';
angular.module("HM_ManageJobSitesMD")
  .controller('HM_ManageJobSitesCtrl', ['$scope', '$http', function($scope, $http){


    $scope.flags = {
      listView : false
    };
    
    $scope.toggleListView  = toggleListView;

    $scope.map = { center: { latitude: 41.850033, longitude: -87.6500523 }, zoom: 8 };

    function toggleListView(option){
      $scope.flags.listView = !$scope.flags.listView;
    }

    $scope.showFilter = false;
    $scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    }

    $scope.search = function() {
      $scope.showSearch = !$scope.showSearch;
      $scope.showFilterDiv = false;
    }

    $scope.filter = function() {
      $scope.showFilterDiv = !$scope.showFilterDiv;
      $scope.showSearch = false;
    }
    $scope.reset = function() {
      $scope.fromDate = '';
      $scope.toDate = '';
      $scope.jobsite = '';
    }

  }]);
