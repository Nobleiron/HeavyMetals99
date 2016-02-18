'use strict';
angular.module('HM_UserProfileMD')
  .controller('HM_UserProfileCtrl', ['$scope','HM_RestSV','HM_UserProfileCnst',function ($scope, RestSV, UserProfileCnst) {

    $scope.saveUserDetails = saveUserDetails;

    _initialize();


    function _initialize(){
      _getUserDetails();
    }


    function saveUserDetails(){
      //TODO
      RestSV.put(UserProfileCnst.saveDetails.url(),{

      })
        .then(function(response){
        })
        .catch(function(){

        });
    }


    function _getUserDetails(){
      RestSV.get(UserProfileCnst.details.url())
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
