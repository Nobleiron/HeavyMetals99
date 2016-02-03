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
    }])
  .directive('testimonial', ['$window', function($window) {
    return {
      link: function(scope, element, attrs) {
        $('#theCarousel').carousel({
            interval: false
          })

          $('.multi-item-carousel .item').each(function(){
            var next = $(this).next();
            if (!next.length) {
              next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            if (next.next().length>0) {
              next.next().children(':first-child').clone().appendTo($(this));
            }
            else {
              $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
          });
      }
    }
  }])

  .directive("scroll", ['$window', function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.boolChangeClass = true;
                 console.log('Scrolled below header.');
             } else {
                 scope.boolChangeClass = false;
                 console.log('Header is in view.');
             }
            scope.$apply();
        });
    };
}]);
