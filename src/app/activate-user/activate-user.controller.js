'use strict';
angular.module("HM_ActivateUserMD")
  .controller("HM_ActivateUserCtrl",['$scope','$stateParams',"HM_RestSV","HM_ActivateUserCnst", function($scope, $stateParams,RestSV, ActivateUserCnst){



    _initialize();

    function _initialize(){

      $scope.flags = {
        activationInProgress : true,
        activationComplete : false,
        alreadyActivated : false,
        activationSuccessful : false,
        activationError : false,
        error : false
      };

      _activateUser();

    }

    function _activateUser(){
      RestSV
        .post( ActivateUserCnst.activate.url() ,{
          email : $stateParams.email,
          auth_code : $stateParams.auth_code
        })
        .then(function(response){
          $scope.flags.activationSuccessful = true;
        })
        .catch(function(response){
          $scope.flags.activationError = true;
        })
        .finally(function(){
          $scope.flags.activationComplete = true;
          $scope.flags.activationInProgress = false;
        })
    }


  }]);
