angular.module("HM_PortalAccessMD")
  .controller('HM_PortalAccessCtrl', ['$scope','$rootScope','$state','HM_PortalAccessCnst','HM_RestSV','localStorageService', function ($scope,$rootScope, $state, PortalAccessCnst,RestSV, localStorageService ) {


    $scope.portalLogin = portalLogin;
    $scope.loginData = {
      credentials : "valid"
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



    function  portalLogin(){
      _resetLoginValidity();
      if($scope.loginForm.$valid){
        $scope.loading = true;
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
  }])
