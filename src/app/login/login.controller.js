'use strict';
angular.module('HM_LoginMD')
  .controller('HM_LoginCtrl', ['$scope','$state','HM_loginCnst','HM_RestSV','localStorageService','$stateParams', function ($scope, $state, LoginCnst,RestSV, localStorageService,$stateParams ) {


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

      $scope.loginData = {
        credentials : "valid"
      }
      $scope.UserRegisterData= {
        alreadyExists  :  "valid",
        termsAccepted : !!$stateParams.terms
      };
      $scope.signUpTab = $state.is("hmPrelogin.register");
    }

    function _invalidateLoginForm(){
      $scope.loginData.credentials = "";
      $scope.loginForm.credentials.$setDirty();
      $scope.loginForm.credentials.$setTouched();
    }

    function _resetLoginValidity(){
      $scope.loginData.credentials = "valid";
      $scope.loginForm.credentials.$setPristine();
      $scope.loginForm.credentials.$setUntouched();
    }


    function _invalidateRegistrationForm(){
      $scope.UserRegisterData.alreadyExists = "";
      $scope.userRegisterForm.alreadyExists.$setDirty();
      $scope.userRegisterForm.alreadyExists.$setTouched();
    }

    function _resetRegistrationValidity(){
      $scope.UserRegisterData.alreadyExists = "valid";
      $scope.userRegisterForm.alreadyExists.$setPristine();
      $scope.userRegisterForm.alreadyExists.$setUntouched();
    }


    function register(){
      _resetRegistrationValidity()
      if($scope.userRegisterForm.$valid){
        $scope.loading = true;
        var url = location.port
        RestSV
          .post( LoginCnst.register.url() ,{
            user_name : $scope.UserRegisterData.firstName + " " + $scope.UserRegisterData.lastName,
            email : $scope.UserRegisterData.email,
            password : $scope.UserRegisterData.password,
            phone : $scope.UserRegisterData.phone,
            url : location.origin + '/#/user/activate'
          })
          .then(function(response){
            $scope.flags.registration.initiated = true;
            $scope.flags.registration.success = true;
          })
          .catch(function(response){
            $scope.formSubmitted = true;
            _invalidateRegistrationForm();
          })
          .finally(function(){
            $scope.loading = false;
          })
      }

    }



    function  login(){
      _resetLoginValidity();
      if($scope.loginForm.$valid){
        $scope.loading = true;
        RestSV
          .post( LoginCnst.login.url() ,{
            email : $scope.loginData.email,
            password : $scope.loginData.password
          },{
            withCredential : true
          })
          .then(function(response){
            $scope.loading = false;
            var userObj = angular.extend({_id : 'userObj'},response.data.result.logged_user_data.logged_user)

            localStorageService.set('userObj',userObj)
            $state.go('hm.dashboard.main');
          })
          .catch(function(error){
            $scope.formSubmitted = true;
            _invalidateLoginForm();
            console.log("Error logging in", error)
            $scope.loading = false;
          });
      } else {
        $scope.loading = false;
      }
    }


  }]);
