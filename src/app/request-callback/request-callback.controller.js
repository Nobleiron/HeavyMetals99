'use strict';
angular.module('HM_RequestCallbackMD')
  .controller('HM_RequestCallBackCtrl', ['$scope', '$http','HM_RequestCallbackCnst',function ($scope, $http, RequestCallbackCnst) {


    $scope.requestCallback = requestCallback;

    requestCallback();


    function requestCallback(){
      
    }

  }]);
