'use strict';
angular.module("HM_InvoicesMD")
  .controller('HM_InvoicesCtrl', ['$scope','PreviousState',function($scope,PreviousState){

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
