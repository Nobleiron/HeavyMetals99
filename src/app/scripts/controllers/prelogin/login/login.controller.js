'use strict';
angular.module('HM_PreloginMD')
  .controller('HM_LoginCtrl', ['$scope','$state', function ($scope, $state) {

    $scope.signUpTab = $state.is("hmPrelogin.register");

    $scope.login = function(){
      $scope.formSubmitted = true;
      //$state.go("hm.dashboard")
    }

  }]);
