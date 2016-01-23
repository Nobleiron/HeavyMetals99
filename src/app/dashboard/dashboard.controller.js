'use strict';
angular.module('HM_DashboardMD')
  .controller('HM_DashboardCtrl', function ($scope, localStorageService) {

    $scope.userObj = localStorageService.get('userObj');
  });
