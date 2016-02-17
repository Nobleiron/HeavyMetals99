'use strict';
angular.module("HM_LoadIndicatorMD")
  .directive('loadIndicator', [function(){
    return {
      replace : true,
      scope : {loading : '=loading'},
      templateUrl:'/app/components/load-indicator/load-indicator.html'
    };
  }]);
