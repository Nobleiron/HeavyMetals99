'use strict';
angular.module("HM_ScrollTopMD")
  .directive('scrollTop', ['$window', function($window){
    return {
      replace : true,
      templateUrl:'/app/scroll-top/scroll-top.html',
      link : function(scope, element){
        scope.showTop = false
        var w = angular.element($window);
        w.bind("scroll", function() {
          scope.showTop =  (this.pageYOffset >= w.height() * 2)
          scope.$apply();
        });

        element.click(function(){
          angular.element('html, body').animate({ scrollTop: 0 });
        })

      }
    };
  }])
  .directive('tabtoggle', ['$window', function($window){
    return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    }]);
