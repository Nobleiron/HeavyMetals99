(function () {
  'use strict';
  var app = angular.module('DisableAnimationMD', []);
  app.directive('disableAnimation', ['$animate',function($animate){
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs){
        debugger
        $attrs.$observe('disableAnimation', function(value){
          $animate.enabled(!value, $element);
        });
      }
    }
  }]);
})()


