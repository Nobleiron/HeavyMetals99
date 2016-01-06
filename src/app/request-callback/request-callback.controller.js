'use strict';
angular.module('HM_RequestCallbackMD')
  .controller('HM_RequestCallBackCtrl', ['$scope', '$http','toastr','HM_RequestCallbackCnst',function ($scope, $http, toastr,RequestCallbackCnst) {


    $scope.requestCallback = requestCallback;


    function requestCallback(){
      toastr.success('We will get back to you shortly');
      $scope.$dismiss();
    }

  }]);
