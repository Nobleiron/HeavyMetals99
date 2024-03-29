'use strict';
angular.module('HM_RequestsMD')
  .controller('HM_RequestsCtrl', ['$scope','HM_RestSV','toastr','HM_RequestsCnst',function ($scope,RestSV, toastr,HM_RequestsCnst) {



    _initialize()

    function _initialize(){
      _fetchRequest();
    }


    function _fetchRequest(){
      $scope.fetchDataInProgress= true;
      RestSV.get(HM_RequestsCnst.pickUpRequests.url())
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

    $scope.search = function() {
		$scope.showSearch = !$scope.showSearch;
		$scope.showFilterDiv = false;
	}

  }]);
