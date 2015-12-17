'use strict';
angular.module("HM_SearchMD")
  .directive('searchResultListView', [ function(){
    return {
      restrict : 'E',
      templateUrl : 'app/search/list.html'
    };
  }]);
