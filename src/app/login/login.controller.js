'use strict';
angular.module('HM_LoginMD')
  .controller('HM_LoginCtrl', ['$scope','$state','HM_loginCnst','HM_RestSV','HM_CoreClientStoreSV', function ($scope, $state, LoginCnst,RestSV, ClientStoreSV ) {


    _initialize();


    $scope.login = login;

    $scope.register = register;


    function _initialize(){
      $scope.credentials = "valid";
      $scope.UserRegisterData = {};
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
      if($scope.userRegisterForm.$valid){
        RestSV
          .post( LoginCnst.register.url() ,{
            user_name :'saneilnaik11',
            email : $scope.UserRegisterData.email,
            password : $scope.UserRegisterData.password,
            phone : $scope.UserRegisterData.phone
          })
          .then(function(response){

            // TODO user activation screen
          })
          .catch(function(error){
            // TODO Exception handler
          });
      }

    }

    function  login(){
      _resetLoginValidity();
      if($scope.loginForm.$valid){
        RestSV
          .post( LoginCnst.login.url() ,{
            email : $scope.loginData.email,
            password : $scope.loginData.password
          })
          .then(function(response){

            var userObj = angular.extend({_id : 'userObj'},response.data.result.logged_user_data.logged_user)

            ClientStoreSV
              .post(userObj)
              .then(function(){
                $state.go('hm.dashboard')
              })
              .catch(function(err){
                $state.go('hm.dashboard')
                console.log('Error saving User Data', err)
              });
            //
          })
          .catch(function(error){
            $scope.formSubmitted = true;
            _invalidateLoginForm();
            console.log("Error logging in", error)
          });
      }
    }


  }]);
