'use strict';
angular.module('HM_PreloginMD')
  .controller('HM_LoginCtrl', ['$scope','$state', function ($scope, $state) {

    $scope.signUpTab = $state.is("hmPrelogin.register");
    $scope.credentials = "";

    $scope.login = function(){
      $scope.loginForm.credentials.$setDirty();
      $scope.loginForm.credentials.$setTouched();
      $scope.formSubmitted = true;
    };

    $scope.register = function(){
      $scope.formSubmitted = true;
    }

  }]);
