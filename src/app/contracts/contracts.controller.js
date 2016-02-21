angular.module("HM_ContractsMD")
  .controller('HM_ContractsCtrl', ['$scope', 'HM_RestSV', 'HM_ContractCnst', function ($scope, RestSV, ContractCnst) {


    _defineScope();

    function _defineScope() {
      $scope.flags = {
        PageNoforOpen: 1,
        PageNoforClosed: 1,
        openTab: true,
        showFilter: false,
        dataLoading: false,
        showSearch: false
      };

      $scope.loadOpenContracts = loadOpenContracts;

      $scope.loadClosedContracts = loadClosedContracts;

      $scope.tabChange = tabChange;

      $scope.toggleFilter = toggleFilter;

      $scope.toggleSearch = toggleSearch;
    }


    function toggleFilter() {
      $scope.flags.showFilter = !$scope.flags.showFilter
    };

    function tabChange() {
      $scope.flags.openTab ? loadOpenContracts() : loadClosedContracts();
    };


    function toggleSearch() {
      $scope.flags.showSearch = !$scope.flags.showSearch
    }

    function loadOpenContracts() {
      $scope.flags.dataLoading = true;
      $scope.flags.openTab = true;
      $scope.contractPromise = RestSV.get(ContractCnst.list.url(), {
        active_status: true,
        return_status_qty: true,
        archived_status: false,
        detail_report_status: false,
        search_value :  $scope.flags.contractName ||  null,
        search_by : 'name',
        page: $scope.flags.PageNoforOpen
      })
        .then(function (response) {
          $scope.openContracts = response.data.result.ContactList;
          $scope.flags.dataLoading = false;
        })
        .catch(function (error) {
          $scope.openContracts = [];
          toastr.error('Failed to fetch Open Contracts');
        })

    }

    function loadClosedContracts() {
      $scope.flags.openTab = false;
      $scope.flags.dataLoading = true;
      $scope.contractPromise = RestSV.get(ContractCnst.list.url(), {
        active_status: false,
        return_status_qty: true,
        archived_status: false,
        detail_report_status: false,
        search_by : 'name',
        search_value :  $scope.flags.contractName ||  null,
        page: $scope.flags.PageNoforClosed
      })
        .then(function (response) {
          $scope.closedContracts = response.data.result.ContactList;
          $scope.flags.dataLoading = false;
        })
        .catch(function (error) {
          $scope.closedContracts = [];
          toastr.error('Failed to fetch Closed Contracts');
        })

    }


  }]);
