'use strict';
angular.module("HM_InvoicesMD")
  .controller('HM_InvoicesCtrl', ['$scope','PreviousState','HM_RestSV',function($scope,PreviousState,RestSV){


    RestSV.get('/portal/outstandingInvoiceList')
      .then(function(){
        debugger
      })
      .catch(function(){
        debugger
      });
    console.log(PreviousState)

    $scope.invoices = [{
      no :'93234',
      purchaseOrder: '23434',
      contract : '2348954',
      dueAmount : '$0.00',
      total : '$145.00',
      jobsite : 'Harbour Fight'

    },
      {
        no :'93234',
        purchaseOrder: '23434',
        contract : '2348954',
        dueAmount : '$0.00',
        total : '$145.00',
        jobsite : 'Harbour Fight'

      },
      {
        no :'93234',
        purchaseOrder: '23434',
        contract : '2348954',
        dueAmount : '$0.00',
        total : '$145.00',
        jobsite : 'Harbour Fight'

      },
      {
        no :'93234',
        purchaseOrder: '23434',
        contract : '2348954',
        dueAmount : '$0.00',
        total : '$145.00',
        jobsite : 'Harbour Fight'

      }]



  }]);
