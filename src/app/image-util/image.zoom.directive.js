angular.module("HM_GlobalMD")
.directive('hmZoom', function(){
    return  {
      link : function(scope, element){
        element.find("img").load(function(){
          element.addClass("zoom")
          !element.hasClass('zoom-bound') && element.zoom({magnify : 2}).addClass('zoom-bound')
        });
      }
    };
  });
