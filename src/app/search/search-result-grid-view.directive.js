'use strict';
angular.module("HM_SearchMD")
  .directive('searchResultGridView', [ function(){
    return {
      restrict : 'E',
      templateUrl : 'app/search/grid.html'
    };
  }]);
