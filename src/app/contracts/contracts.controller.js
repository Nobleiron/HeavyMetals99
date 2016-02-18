angular.module("HM_ContractsMD")
.controller('HM_ContractsCtrl', ['$scope','HM_RestSV','HM_ContractCnst', function($scope,RestSV,ContractCnst){

    $scope.flags = { Page : 1, openTab : true};


    $scope.pageChanged = function(){
      $scope.flags.openTab ? loadOpenContracts() : loadClosedContracts();
    };

    $scope.loadOpenContracts = loadOpenContracts;

    $scope.loadClosedContracts = loadClosedContracts;

    function loadOpenContracts(){
      $scope.flags.openTab = true;
      $scope.contractPromise =  RestSV.get(ContractCnst.list.url(),{
        active_status : true,
        return_status_qty: true,
        archived_status : false,
        detail_report_status : false,
        page : $scope.flags.Page
      })
        .then(function(response){
          $scope.openContracts = response.data.result.ContactList;
          $scope.flags.Total_pages = response.data.result.Total_pages;
          $scope.flags.ContactList_Quantity = response.data.result.ContactList_Quantity
            $scope.flags.Page = response.data.result.Page
        })
        .catch(function(error){
          $scope.openContracts = [];
          toastr.error('Failed to fetch Press Releases');
        })

    }

    function loadClosedContracts(){
      $scope.flags.openTab = false;
      $scope.contractPromise = RestSV.get(ContractCnst.list.url(),{
        active_status : false,
        return_status_qty: true,
        archived_status : false,
        detail_report_status : false,
        page : $scope.flags.Page
      })
        .then(function(response){
          $scope.closedContracts = response.data.result.ContactList;
        })
        .catch(function(error){
          $scope.closedContracts = [];
          toastr.error('Failed to fetch Press Releases');
        })

    }


}]);
