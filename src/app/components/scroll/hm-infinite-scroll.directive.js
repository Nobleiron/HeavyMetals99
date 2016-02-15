(function (ng) {
  'use strict';
  var module = ng.module('hmInfiniteScroll', []);

  module.directive('hmInfiniteScroll', ['$timeout', function (timeout) {
    return{
      link: function (scope, element, attr) {
        var
          lengthThreshold = attr.scrollThreshold || 50,
          timeThreshold = attr.timeThreshold || 400,
          handler = scope.$eval(attr.lrInfiniteScroll),
          promise = null,
          lastRemaining = 9999;

        lengthThreshold = parseInt(lengthThreshold, 10);
        timeThreshold = parseInt(timeThreshold, 10);

        if (!handler || !ng.isFunction(handler)) {
          handler = ng.noop;
        }

        angular.element('body').bind('scroll.hmInfiniteScroll', function () {
          var
            remaining = element[0].scrollHeight - (element[0].clientHeight + element[0].scrollTop);

          //if we have reached the threshold and we scroll down
          if (remaining < lengthThreshold && (remaining - lastRemaining) < 0) {

            //if there is already a timer running which has no expired yet we have to cancel it and restart the timer
            if (promise !== null) {
              timeout.cancel(promise);
            }
            promise = timeout(function () {
              handler();
              promise = null;
            }, timeThreshold);
          }
          lastRemaining = remaining;
        });

        scope.$on('$destroy', function(){
          angular.element('body').unbind('scroll.hmInfiniteScroll')
        })
      }

    };
  }]);
})(angular);
