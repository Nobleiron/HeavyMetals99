'use strict';
angular.module('HM_PreloginMD')
  .controller('HM_LoginCtrl', ['$scope','$state', function ($scope, $state) {

    $scope.signUpTab = $state.is("hmPrelogin.register");

  }]);
