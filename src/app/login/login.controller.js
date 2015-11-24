'use strict';
angular.module('HM_LoginMD')
  .controller('HM_LoginCtrl', ['$scope','$state','HM_loginCnst','HM_RestSV','localStorageService','$http', function ($scope, $state, LoginCnst,RestSV, localStorageService,$http ) {


    _initialize();

    $scope.login = login;

    $scope.register = register;


    function _initialize(){
      $scope.flags = {
        registration : {
          success : false,
          error : false,
          initiated : false
        }
      };
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
        var url = location.port
        RestSV
          .post( LoginCnst.register.url() ,{
            user_name : $scope.UserRegisterData.firstName + $scope.UserRegisterData.lastName,
            email : $scope.UserRegisterData.email,
            password : $scope.UserRegisterData.password,
            phone : $scope.UserRegisterData.phone,
            url : getLocation() + '/#/user/activate'
          })
          .then(function(response){
            $scope.flags.registration.success = true;
            // TODO user activation screen
          })
          .catch(function(response){
            $scope.flags.registration.error = true;
            $scope.errorMessage = response.data.errortext[0];
            // TODO Exception handler
          })
          .finally(function(){
            $scope.flags.registration.initiated = true;
          })
      }

    }

    function getLocation(){
      var url = location.origin;
      if(location.port){
          url = url + ":" + location.port;
      }
      return url;
    }

    function  login(){
      _resetLoginValidity();
      if($scope.loginForm.$valid){
        RestSV
          .post( LoginCnst.login.url() ,{
            email : $scope.loginData.email,
            password : $scope.loginData.password
          },{
            withCredential : true
          })
          .then(function(response){

            var userObj = angular.extend({_id : 'userObj'},response.data.result.logged_user_data.logged_user)

            localStorageService.set('userObj',userObj)
            $state.go('hm.dashboard');
          })
          .catch(function(error){
            $scope.formSubmitted = true;
            _invalidateLoginForm();
            console.log("Error logging in", error)
          });
      }
    }


  }]);
