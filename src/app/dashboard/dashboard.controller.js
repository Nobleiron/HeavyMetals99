'use strict';
angular.module('HM_DashboardMD')
  .controller('HM_DashboardCtrl', function ($scope, localStorageService) {

    $scope.userObj = localStorageService.get('userObj');

    $scope.showFilter = false;
	$scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    }
    
  });
