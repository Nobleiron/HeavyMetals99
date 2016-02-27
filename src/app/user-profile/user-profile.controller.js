'use strict';
angular.module('HM_UserProfileMD')
  .controller('HM_UserProfileCtrl', ['$scope','HM_RestSV','HM_UserProfileCnst','toastr',function ($scope, RestSV, UserProfileCnst,toastr) {

    $scope.saveUserDetails = saveUserDetails;

    $scope.savePassword = savePassword;

    $scope.userProfile = {};
    $scope.updatePassword= {};
    $scope.updatePortalDetails= {};

    _initialize();


    function _initialize(){
      _getUserDetails();
    }


    function saveUserDetails(){
      //TODO
      if($scope.userProfile.form.$valid){
      $scope.userDetailsPromise = RestSV.put(UserProfileCnst.update.url(),{
        name : $scope.userDetails.User_name,
        address : $scope.userDetails.Address,
        city : $scope.userDetails.City,
        state : $scope.userDetails.State,
        company : $scope.userDetails.Company,
        zip_code : $scope.userDetails.Postal_code,
        phone : $scope.userDetails.Phone,
        country : "99"

      })
        .then(function(){
          toastr.success("Profile updated successfully")
        })
        .catch(function(){
        toastr.error("Failed to Update User Details")
        });
      }
    }


    function savePassword(){
      if($scope.updatePassword.form.$valid){
        $scope.userDetailsPromise = RestSV.put(UserProfileCnst.updatePassword.url(),{
          new_pass : $scope.updatePassword.newPassword1
        })
          .then(function(){
            toastr.success("Password updated successfully")
          })
          .catch(function(){
            toastr.error("Failed to Update Password")
          });
      }

    }


    function _getUserDetails(){
      $scope.userDetailsPromise = RestSV.get(UserProfileCnst.details.url())
        .then(function(response){
          $scope.userDetails = response.data.result.User_details;
          _getFirstNameAndLastName();
        })
        .catch(function(){

        });
    }


    function _getFirstNameAndLastName(user){
      var username = $scope.userDetails.User_name;
      username = username.split(' ')
      $scope.userDetails.firstName = username[0];
      $scope.userDetails.lastName = username[1];
    }



  }]);
