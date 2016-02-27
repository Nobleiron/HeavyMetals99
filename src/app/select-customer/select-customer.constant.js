angular.module("HM_SelectCustomerMD")
  .constant('HM_SelectCustomerCnst', {
    list : {
      url : function(){
        return '/portalcustomers';
      }
    }
  });
