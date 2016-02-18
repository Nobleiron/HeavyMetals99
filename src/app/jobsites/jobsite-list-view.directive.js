'use strict';
angular.module("HM_JobSitesMD")
  .directive('jobSiteListView', [ function(){
    return {
      restrict : 'E',
      templateUrl : 'app/jobsites/list.html'
    };
  }]);
