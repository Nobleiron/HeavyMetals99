'use strict';
angular.module("HM_InvoicesMD")
  .controller('HM_InvoicesCtrl', ['$scope','PreviousState','HM_RestSV','HM_InvoicesCnst',function($scope,PreviousState,RestSV, InvoicesCnst){

    $scope.flags = {
      outstanding : false,
      is_include_history : false
    };

    $scope.showFilter = false;
    $scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }


    $scope.fetchInvoices  = _fetchInvoices;

    $scope.toggleInvoiceView  = _toggleInvoiceView;

    _fetchInvoices();

    function _fetchInvoices(){
      var params = {is_include_history : $scope.flags.is_include_history, outstanding: $scope.flags.outstanding};
      $scope.query && $scope.query.length >= 3 && angular.extend(params,{search_by :'Site_Name',search_value : $scope.query});
      RestSV.get(InvoicesCnst.invoicesList.url(), params)
        .then(function(response){
          $scope.invoices = response.data.result.InvoiceInquery_List || response.data.result.OutstandingInvoice_List;
        })
        .catch(function(){

        });
    }

    function _toggleInvoiceView(option){
      $scope.flags.outstanding = !$scope.flags.outstanding;
      _fetchInvoices();
    }




  }]);
