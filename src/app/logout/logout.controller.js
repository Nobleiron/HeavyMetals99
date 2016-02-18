'use strict';
angular.module('HM_LogoutMD')
  .controller('HM_LogoutCtrl', ['$scope','$state','HM_logoutCnst','HM_RestSV','localStorageService', function ($scope, $state, LogoutCnst,RestSV , localStorageService) {


    _initialize();


    function _initialize(){
      localStorageService.remove("cartData");
      var loggedOut = RestSV.get( LogoutCnst.logout.url() );
      loggedOut
        .finally(function(){
          localStorageService.remove("userObj");
          $state.go('hmPrelogin.login');
        })
    }



  }]);
