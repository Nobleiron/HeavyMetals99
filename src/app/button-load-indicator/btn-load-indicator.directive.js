'use strict';
angular.module("HM_BtnLoadIndicatorMD")
  .directive('btnLoadIndicator', [function(){
    return {
      scope : {
        'btnUid' :'=btnUid'
      },
      link : function(scope,element,attrs){

        var loader = angular.element("<i class='fa fa-spinner fa-spin'  style='font-size: 18px;display: none;'></i>"),
          eventName = attrs.btnLoadIndicator;
        element.after(loader);

        scope.$on(eventName+':Start', function(e, uid){
          debugger
          if(scope.btnUid == uid){
              loader.show();
              element.parent('button').attr("disabled","disabled");
              element.hide();
          }
        });

        scope.$on(eventName+':End', function(e, uid){
          if(scope.btnUid == uid) {
              element.parent('button').removeAttr("disabled");
              element.show();
              loader.hide();
          }
        });




      }
    };
  }]);
