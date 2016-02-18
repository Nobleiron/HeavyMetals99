'use strict';
angular.module("HM_SearchMD")
  .directive('searchResultGridView', [ function(){
    return {
      restrict : 'E',
      template: '<ng-include src="dynamicTemplateUrl"></ng-include>',
      link : function(scope) {
        var unwatch =  scope.$watch('selection', function(c) {
          if(c){
            scope.dynamicTemplateUrl = c.type == "buy" ? 'app/search/buy-grid.html' : 'app/search/grid.html';
            unwatch();
          }
        });
      }
    };
  }]);
