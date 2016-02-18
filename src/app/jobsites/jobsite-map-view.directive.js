'use strict';
angular.module("HM_JobSitesMD")
  .directive('jobSiteMapView', [ function(){
    return {
      restrict : 'E',
      templateUrl : 'app/jobsites/map.html'
    };
  }]);
