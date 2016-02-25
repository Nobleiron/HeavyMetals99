angular.module("HM_ContractsMD")
  .controller('HM_ContractsCtrl', ['$scope','$state','$stateParams', 'HM_RestSV', 'HM_ContractCnst','toastr', function ($scope,$state, $stateParams, RestSV, ContractCnst,toastr) {



    _defineScope();

    $scope.loadOpenContracts = loadOpenContracts;

    $scope.loadClosedContracts = loadClosedContracts;

    $scope.tabChange = tabChange;

    $scope.toggleFilter = toggleFilter;

    $scope.toggleSearch = toggleSearch;

    $scope.pageChanged = pageChanged;




    function toggleFilter() {
      $scope.flags.showFilter = !$scope.flags.showFilter
    };

    function tabChange(tab) {
      $scope.flags.status =  tab;

      if(tab === 'open'){
        $scope.flags.pc = null;
        loadOpenContracts();
      }else{
        $scope.flags.po = null;
        loadClosedContracts();
      }
      $state.go('hm.dashboard.contracts',{
        pc :  $scope.flags.pc,
        po :  $scope.flags.po,
        status :   $scope.flags.status
      },{notify : false});
    };


    function toggleSearch() {
      $scope.flags.showSearch = !$scope.flags.showSearch
    }

    function loadOpenContracts() {
      $scope.contractPromise = RestSV.get(ContractCnst.list.url(), {
        active_status: true,
        return_status_qty: true,
        archived_status: false,
        detail_report_status: false,
        search_value :  $scope.flags.contractName ||  null,
        search_by : 'name',
        page: $scope.flags.po
      })
        .then(function (response) {
          $scope.openContracts = response.data.result.ContactList;
          $scope.flags.qty = response.data.result.ContactList_Quantity;
          $scope.flags.hasData = !!$scope.openContracts;
          $scope.flags.Total_pages = parseInt(response.data.result.Total_pages);
        })
        .catch(function (error) {
          $scope.openContracts = [];
          toastr.error('Failed to fetch Open Contracts');
        })

    }

    function loadClosedContracts() {
      $scope.contractPromise = RestSV.get(ContractCnst.list.url(), {
        active_status: false,
        return_status_qty: true,
        archived_status: false,
        detail_report_status: false,
        search_by : 'name',
        search_value :  $scope.flags.contractName ||  null,
        page: $scope.flags.pc
      })
        .then(function (response) {
          $scope.closedContracts = response.data.result.ContactList;
          $scope.flags.hasData = !!$scope.closedContracts;
          $scope.flags.qty = response.data.result.ContactList_Quantity;
          $scope.flags.Total_pages = parseInt(response.data.result.Total_pages);
        })
        .catch(function (error) {
          $scope.closedContracts = [];
          toastr.error('Failed to fetch Closed Contracts');
        })

    }


    function pageChanged(){
      if($scope.flags.status === 'open'){
        loadOpenContracts();
      }else{
        loadClosedContracts();
      }
      $state.go('hm.dashboard.contracts',{
        pc :  $scope.flags.pc,
        po :  $scope.flags.po,
        status :   $scope.flags.status
      },{notify : false});
    }


    function _defineScope() {
      $scope.flags = angular.extend({
        po: 1,
        pc: 1,
        status: 'open',
        openTab : $stateParams.status !== 'closed',
        closedTab : $stateParams.status === 'closed',
        hasData : true,
        showFilter: false,
        dataLoading: false,
        showSearch: false
      }, $stateParams);
    }


    $scope.search = function() {
      $scope.showSearch = !$scope.showSearch;
      $scope.showFilterDiv = false;
    }

    $scope.filter = function() {
      $scope.showFilterDiv = !$scope.showFilterDiv;
      $scope.showSearch = false;
    }
    $scope.reset = function() {
      $scope.fromDate = '';
      $scope.toDate = '';
      $scope.jobsite = '';
    }

  }]);
