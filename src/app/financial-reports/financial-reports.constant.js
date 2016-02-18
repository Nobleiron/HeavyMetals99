angular.module("HM_FinancialReportsMD")
  .constant('HM_FinancialReportsCnst', {
    list : {
      url : function(){
        return '/financialreports';
      }
    }
  });
