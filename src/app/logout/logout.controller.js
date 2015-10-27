'use strict';
angular.module('HM_LogoutMD')
  .controller('HM_LogoutCtrl', ['$scope','$state','HM_logoutCnst','HM_RestSV','HM_CoreClientStoreSV', function ($scope, $state, LogoutCnst,RestSV, ClientStoreSV ) {


    _initialize();



    function _initialize(){
      var loggedOut = RestSV.get( LogoutCnst.logout.url() );

      loggedOut
        .then( function(){
          ClientStoreSV
            .get('userObj')
            .then(function(userObj){
              ClientStoreSV.remove(userObj);
            })
            .finally(function(){
              $state.go('hmPrelogin.login');
            })

        });
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

    function  logout(){
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
              .put(userObj)
              .then(function(){
                $state.go('hm.dashboard')
              })
              .catch(function(err){
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
