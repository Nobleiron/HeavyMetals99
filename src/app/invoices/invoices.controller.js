'use strict';
angular.module("HM_InvoicesMD")
  .controller('HM_InvoicesCtrl', ['$scope','PreviousState','HM_RestSV','HM_InvoicesCnst',function($scope,PreviousState,RestSV, InvoicesCnst){

    $scope.flags = {
      outstanding : false,
      invoicesInProgress : true,
      is_include_history : false,
      page : 1
    };

    $scope.showFilter = false;
    $scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    };


    $scope.fetchInvoices  = _fetchInvoices;

    $scope.toggleInvoiceView  = _toggleInvoiceView;

    $scope.pageChange = pageChange;

    _fetchInvoices();

    function _fetchInvoices(){
      var params = {is_include_history : $scope.flags.is_include_history, outstanding: $scope.flags.outstanding,
        page : $scope.flags.page
      };
      $scope.query && $scope.query.length >= 3 && angular.extend(params,{search_by :'Site_Name',search_value : $scope.query});
      $scope.invoicesPromise = RestSV.get(InvoicesCnst.invoicesList.url(), params)
        .then(function(response){
          $scope.invoices = response.data.result.InvoiceInquery_List || response.data.result.OutstandingInvoice_List;
          $scope.flags.total_pages = parseInt(response.data.result.Total_pages);
          $scope.flags.qty = response.data.result.InvoiceInquery_Qty || response.data.result.InvoiceList_Qty;
        })
        .catch(function(){

        })
        .finally(function(){
          $scope.flags.invoicesInProgress = false;
        })
    }

    function _toggleInvoiceView(option){
      $scope.flags.outstanding = !$scope.flags.outstanding;
      _fetchInvoices();
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


    function pageChange(){
      _fetchInvoices();
    }



  }]);
