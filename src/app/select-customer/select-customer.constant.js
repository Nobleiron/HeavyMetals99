angular.module("HM_SelectCustomerMD")
  .constant('HM_SelectCustomerCnst', {
    list : {
      url : function(){
        return '/portalcustomers';
      }
    },
    assign : {
      url : function(){
        return '/portalcustomers/assign';
      }
    },
    noOfRecords : 15
  });
