'use strict';
angular.module('HM_RequestsMD')
  .controller('HM_RequestsCtrl', ['$scope', '$http','toastr','HM_RequestsCnst',function ($scope, $http, toastr,RequestCallbackCnst) {


    $scope.requestCallback = requestCallback;


    function requestCallback(){
      toastr.success('We will get back to you shortly');
      $scope.$dismiss();
    }

    $scope.search = function() {
		$scope.showSearch = !$scope.showSearch;
		$scope.showFilterDiv = false;
	}

  }]);
