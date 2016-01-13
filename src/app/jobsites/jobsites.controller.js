'use strict';
angular.module("HM_JobSitesMD")
  .controller('HM_JobSitesCtrl', ['$scope','$state','$uibModal','HM_RestSV', 'HM_JobSitesCnst', function($scope,$state,$uibModal, RestSV, ManageJobSitesCnst){

    $scope.jobsites = [];

    $scope.flags = {
      jobSiteFetchInProgress: true
    };

    $scope.viewJobSiteDetails = viewJobSiteDetails;

    $scope.$on('JobSite:Update', function(e, jobsite){
      $scope.jobsites.map(function(j){
        jobsite.SiteID === j.SiteID && angular.extend(j, jobsite);
      });
    });

    _fetchJobsites();

    function _fetchJobsites(){

      RestSV.get(ManageJobSitesCnst.jobsites.url())
        .then(function(response){
          if(response.data.result){
            $scope.jobsites =  response.data.result.Jobsite_details;
          }
        })
        .catch(function(){

        })
        .finally(function(){
          $scope.flags.jobSiteFetchInProgress = false;
        })
    }


    function viewJobSiteDetails(jobsite){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/jobsites/jobsite-details.html',
        controller: ['$scope',function (scope) {
          scope.jobsite = jobsite;
        }]
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
      });
    }

    $scope.toggleListView  = toggleListView;

    $scope.map = { center: { latitude: 41.850033, longitude: -87.6500523 }, zoom: 8 };

    function toggleListView(){
      $scope.params.listView = !$scope.params.listView;
      $state.go('hm.dashboard.jobSites',$scope.params);
    }

    $scope.showFilter = false;
    $scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    };

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    };

    $scope.search = function() {
      $scope.showSearch = !$scope.showSearch;
      $scope.showFilterDiv = false;
    }

    $scope.filter = function() {
      $scope.showFilterDiv = !$scope.showFilterDiv;
      $scope.showSearch = false;
    }
    $scope.reset = function() {
      $scope.fromDate = '';
      $scope.toDate = '';
      $scope.jobsite = '';
    }

  }]);
