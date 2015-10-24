'use strict';
angular.module('HM_LoginMD')
  .controller('HM_LoginCtrl', ['$scope','$state','HM_loginCnst','HM_RestSV', function ($scope, $state, LoginCnst,RestSV ) {


    _initialize();

    $scope.login = login;

    $scope.register = register;


    function _initialize(){
      $scope.signUpTab = $state.is("hmPrelogin.register");
      //$scope.credentials = "";
    }


    function register(){
      $scope.formSubmitted = true;
    }



    function  login(){
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
            console.log("Error logging in", error)
          });
      }
    }

  }]);
