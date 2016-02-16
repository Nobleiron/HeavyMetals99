angular.module("HM_BoardOfDirectorsMD")
  .constant('HM_BoardOfDirectorsCnst', {
    list : {
      url : function(){
        return '/boardmembers';
      }
    }
  });
