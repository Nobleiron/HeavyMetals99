'use strict';
angular.module("HM_SearchMD")
  .directive('searchResultListView', [ '$parse', function($parse){
    return {
      restrict : 'E',
      template: '<ng-include src="dynamicTemplateUrl"></ng-include>',
      link : function(scope) {
       var unwatch =  scope.$watch('selection', function(c) {
         if(c){
           scope.dynamicTemplateUrl = c.type == "buy" ? 'app/search/buy-list.html' : 'app/search/list.html';
           unwatch();
         }
        });
      }
    };
  }]);
