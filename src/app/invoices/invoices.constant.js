'use strict';
angular.module('HM_InvoicesMD')
  .constant('HM_InvoicesCnst', {
    invoicesList: {
      url: function () {
        return '/portal/invoices';
      }
    },
    details : {
      url : function(){
        return '/portal/Invoice_detail'
      }
    }
  });
