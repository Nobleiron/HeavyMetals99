'use strict';
angular.module("HM_InvoicesMD")
  .controller('HM_InvoicesCtrl', ['$scope','$stateParams','$state','HM_RestSV','HM_InvoicesCnst',function($scope,$stateParams,$state, RestSV, InvoicesCnst){



    $scope.fetchInvoices  = _fetchInvoices;

    $scope.toggleInvoiceView  = _toggleInvoiceView;

    $scope.pageChange = pageChange;

    _defineScope();

    _fetchInvoices();

    function _fetchInvoices(){
      var params = {is_include_history : $scope.flags.is_include_history, outstanding: $scope.flags.outstanding == 'Y',
        page : $scope.flags.page
      };
      $scope.query && $scope.query.length >= 3 && angular.extend(params,{search_by :'Site_Name',search_value : $scope.query});
      $scope.invoicesPromise = RestSV.get(InvoicesCnst.invoicesList.url(), params)
        .then(function(response){
          $scope.invoices = response.data.result.Invoices;
          $scope.flags.total_pages = parseInt(response.data.result.Total_pages);
          $scope.flags.qty = response.data.result.Invoices_Qty;
        })
        .catch(function(){

        })
        .finally(function(){
          $scope.flags.invoicesInProgress = false;
        })
    }

    function _toggleInvoiceView(){
      $scope.flags.outstanding = $scope.flags.outstanding == 'Y' ? 'N' : 'Y';
      $scope.flags.page = 1;
      pageChange()
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
      $state.go('hm.dashboard.invoices', {page : $scope.flags.page, outstanding: $scope.flags.outstanding},{notify: false})
    }

    function _defineScope(){
      console.log($stateParams);
      $scope.flags = angular.extend({
        outstanding : 'N',
        invoicesInProgress : true,
        is_include_history : false,
        page : 1
      },$stateParams);
      $scope.showFilter = false;
      $scope.filterBtn = function() {
        $scope.showFilter = !$scope.showFilter
      };
    }


  }]);
