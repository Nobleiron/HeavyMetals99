angular.module("HM_PortalAccessMD")
  .controller('HM_PortalAccessCtrl', ['$scope','$rootScope','$state','HM_PortalAccessCnst','HM_RestSV','localStorageService','toastr', function ($scope,$rootScope, $state, PortalAccessCnst,RestSV, localStorageService,toastr ) {


    $scope.portalLogin = portalLogin;
    $scope.loginData = {
      credentials : "valid"
    };

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



    function  portalLogin(){
      $scope.$broadcast('PortalAccess:Process:Start')
      _resetLoginValidity();
      if($scope.loginForm.$valid){
        RestSV
          .post( PortalAccessCnst.access.url() ,{
            email : $scope.loginData.email,
            password : $scope.loginData.password
          },{
            withCredential : true
          })
          .then(function(response){
            $scope.loading = false;
            var userObj = angular.extend({_id : 'userObj'},response.data.result.logged_user_data.logged_user)
            localStorageService.set('userObj',userObj);
            $rootScope.$broadcast("PortalAccess:Granted", userObj);
            toastr.success("Portal Access Granted");
            $state.go('hm.dashboard.main');
          })
          .catch(function(error){
            $scope.formSubmitted = true;
            _invalidateLoginForm();
            toastr.error("Failed to give Portal Access");
            console.log("Error logging in", error)
          })
          .finally(function(){
            $scope.$broadcast('PortalAccess:Process:End');
          })
      }
    }
  }])
