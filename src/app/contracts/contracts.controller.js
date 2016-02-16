angular.module("HM_ContractsMD")
.controller('HM_ContractsCtrl', ['$scope','HM_RestSV','HM_ContractCnst', function($scope,RestSV,ContractCnst){



    $scope.loadOpenContracts = loadOpenContracts;

    $scope.loadClosedContracts = loadClosedContracts;

    function loadOpenContracts(){

      $scope.fetchOpenContractInProgress= true;
      RestSV.get(ContractCnst.list.url(),{
        active_status : true,
        return_status_qty: true,
        archived_status : true,
        detail_report_status : false

      })
        .then(function(response){
          $scope.openContracts = response.data.result.ContactList;
        })
        .catch(function(error){
          $scope.openContracts = [];
          toastr.error('Failed to fetch Press Releases');
        })
        .finally(function(){
          $scope.fetchOpenContractInProgress= false;
        })

    }

    function loadClosedContracts(){
      $scope.fetchClosedContractInProgress = true;
      RestSV.get(ContractCnst.list.url(),{
        active_status : false,
        return_status_qty: true,
        archived_status : true,
        detail_report_status : false

      })
        .then(function(response){
          $scope.closedContracts = response.data.result.ContactList;
        })
        .catch(function(error){
          $scope.closedContracts = [];
          toastr.error('Failed to fetch Press Releases');
        })
        .finally(function(){
          $scope.fetchClosedContractInProgress = false;
        })
    }


}]);
