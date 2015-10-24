angular.module("HM_GlobalMD")
.directive('hmZoom', function(){
    return  {
      link : function(scope, element){
        element.addClass("zoom")
        !element.hasClass('zoom-bound') && element.zoom({magnify : 2}).addClass('zoom-bound')
      }
    };
  });
