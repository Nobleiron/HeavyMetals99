'use strict';
angular.module("HM_InvoicesMD")
  .controller('HM_InvoiceDetailsCtrl', ['$scope','$stateParams','HM_RestSV','HM_InvoicesCnst','toastr',function($scope,$stateParams,RestSV, InvoicesCnst,toastr) {


    $scope.invoicesPromise = RestSV.get(InvoicesCnst.details.url(), { invoice_id: $stateParams.id })
      .then(function(response){
        debugger
        $scope.invoice = response.data.result.Orders;
      })
      .catch(function(){
        toastr.error("Failed to fetch Invoice");
      })


  }]);
