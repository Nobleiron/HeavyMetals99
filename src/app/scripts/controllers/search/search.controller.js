'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",['$scope', function($scope){

    $scope.results = [{},{},{},{},{}];

    $scope.toggleGridView = function(bool){
      $scope.gridView = bool;
    }


  }]);
