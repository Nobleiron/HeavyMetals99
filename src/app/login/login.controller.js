'use strict';
angular.module('HM_LoginMD')
  .controller('HM_LoginCtrl', ['$scope','$state','HM_loginCnst','HM_RestSV', function ($scope, $state, LoginCnst,RestSV ) {


    _initialize();

    $scope.login = login;

    $scope.register = register;

    $scope.credentials = "valid";

    function _initialize(){
      $scope.signUpTab = $state.is("hmPrelogin.register");
    }

    function _invalidateLoginForm(){
      $scope.credentials = "";
      $scope.loginForm.credentials.$setDirty();
      $scope.loginForm.credentials.$setTouched();
    }

    function _resetLoginValidity(){
      $scope.credentials = "valid";
      $scope.loginForm.credentials.$setPristine();
      $scope.loginForm.credentials.$setUntouched();
    }


    function register(){
      $scope.formSubmitted = true;
    }

    function  login(){
      _resetLoginValidity();
      if($scope.loginForm.$valid){
        RestSV
          .post( LoginCnst.login.url() ,{
            email : $scope.loginData.email,
            password : $scope.loginData.password
          })
          .then(function(){
            $state.go('hm.dashboard')
          })
          .catch(function(error){
            $scope.formSubmitted = true;
            _invalidateLoginForm();
            console.log("Error logging in", error)
          });
      }
    }


  }]);
