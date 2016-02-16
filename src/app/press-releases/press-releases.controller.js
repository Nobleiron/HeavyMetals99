angular.module("HM_PressReleasesMD")
  .controller('HM_PressReleasesCtrl', ['$scope','HM_RestSV','HM_PressReleasesCnst','toastr', function($scope,RestSV,PressReleasesCnst,toastr){

    _initialize();

    function _initialize(){
      _fetchPressReleases();
    }


    function _fetchPressReleases(){
      $scope.fetchDataInProgress= true;
      RestSV.get(PressReleasesCnst.list.url())
        .then(function(response){
          $scope.releases = response.data.result.Press_release;
        })
        .catch(function(error){
          $scope.releases = [];
          toastr.error('Failed to fetch Press Releases');
        })
        .finally(function(){
          $scope.fetchDataInProgress= false;
        })
    }

  }]);
