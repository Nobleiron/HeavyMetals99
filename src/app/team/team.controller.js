angular.module("HM_TeamMD")
  .controller('HM_TeamCtrl', ['$scope','HM_RestSV','HM_TeamCnst','toastr', function($scope,RestSV,TeamCnst,toastr){

    _initialize();

    function _initialize(){
      _fetchTeam();
    }


    function _fetchTeam(){
      $scope.teamFetchInProgress= true;
      RestSV.get(TeamCnst.team.url())
        .then(function(response){
          $scope.team = response.data.result.Team_details;
        })
        .catch(function(error){
          $scope.team = [];
          toastr.error('Failed to fetch team info');
        })
        .finally(function(){
          $scope.teamFetchInProgress= false;
        })
    }

  }]);
