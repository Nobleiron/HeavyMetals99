angular.module("HM_PressReleasesMD")
  .constant('HM_PressReleasesCnst', {
    list : {
      url : function(){
        return '/pressreleases';
      }
    }
  });
