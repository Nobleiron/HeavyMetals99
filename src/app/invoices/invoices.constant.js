'use strict';
angular.module('HM_InvoicesMD')
  .constant('HM_InvoicesCnst', {
    invoicesList: {
      url: function () {
        return '/portal/invoices';
      }
    }
  });
