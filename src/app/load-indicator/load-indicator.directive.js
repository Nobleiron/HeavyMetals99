'use strict';
angular.module("HM_LoadIndicatorMD")
  .directive('loadIndicator', [function(){
    return {
      replace : true,
      templateUrl:'/app/load-indicator/load-indicator.html'
    };
  }]);
