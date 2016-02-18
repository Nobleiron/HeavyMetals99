angular.module("HM_ContractsMD")
.constant('HM_ContractCnst',{
    list : {
      url : function(){
        return '/portal/contractList';
      }
    }
  });
