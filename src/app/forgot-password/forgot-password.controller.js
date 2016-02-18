'use strict';
angular.module('HM_ForgotPasswordMD')
  .controller('HM_ForgotPasswordCtrl', ['$scope','$state','HM_ForgotPasswordCnst','HM_RestSV', function ($scope, $state, ForgotPasswordCnst,RestSV ) {


    $scope.flags = {
      forgotPasswordNotifyInitiated : false
    }
    $scope.notifyForgotPassword = notifyForgotPassword;


    function notifyForgotPassword(){
      if($scope.forgotPasswordForm.$valid){
        $scope.loading = true;
        RestSV
          .post( ForgotPasswordCnst.forgotPassword.url() ,{
            email : $scope.forgotPasswordData.email,
          })
          .finally(function(response){
            $scope.flags.forgotPasswordNotifyInitiated = true;
            $scope.loading = false;
          });
      } else {
        $scope.loading = false;
      }
    }

  }]);
