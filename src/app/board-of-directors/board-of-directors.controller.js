angular.module("HM_BoardOfDirectorsMD")
  .controller('HM_BoardOfDirectorsCtrl', ['$scope','HM_RestSV','HM_BoardOfDirectorsCnst','toastr', function($scope,RestSV,boardofdirectors,toastr){

    _initialize();

    function _initialize(){
      _fetchBoardOfDirectors();
    }


    function _fetchBoardOfDirectors(){
      $scope.fetchDataInProgress= true;
      RestSV.get(boardofdirectors.list.url())
        .then(function(response){
          $scope.team = response.data.result.Board_of_members;
        })
        .catch(function(error){
          $scope.team = [];
          toastr.error('Failed to fetch board of directors info');
        })
        .finally(function(){
          $scope.fetchDataInProgress= false;
        })
    }

  }]);
