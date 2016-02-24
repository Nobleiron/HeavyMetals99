'use strict';
angular.module("HM_JobSitesMD")
  .controller('HM_JobSitesCtrl', ['$scope', '$state','$stateParams', '$uibModal', 'HM_RestSV', 'HM_JobSitesCnst', 'toastr',function ($scope, $state, $stateParams, $uibModal, RestSV, ManageJobSitesCnst,toastr) {

    $scope.jobsites = [];

    $scope.flags = angular.extend({
      jobSiteFetchInProgress: true,
      page: 1
    },$stateParams);
    $scope.params = angular.extend({mapView: false}, $state.params);
    $scope.params.mapView = toBool($scope.params.mapView);
    $scope.map = {center: {latitude: 41.850033, longitude: -87.6500523}, zoom: 8};

    $scope.viewJobSiteDetails = viewJobSiteDetails;

    $scope.deleteJobSite = deleteJobSite;

    $scope.toggleMapView = toggleMapView;

    $scope.pageChange = pageChange;

    _fetchJobsites();


    function _fetchJobsites() {
      $scope.jobsitesPromise = RestSV.get(ManageJobSitesCnst.jobsites.url(), {
        page: $scope.flags.page,
        mapView : $scope.params.mapView
      })
        .then(function (response) {
          if (response.data.result) {
            $scope.flags.qty = response.data.result.Quantity;
            $scope.flags.total_pages = response.data.result.Total_pages;
            $scope.jobsites = response.data.result.Jobsite_details;
          }
        })
        .catch(function () {

        })
        .finally(function () {
          $scope.flags.jobSiteFetchInProgress = false;
        })
    }


    function viewJobSiteDetails(jobsite) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/jobsites/jobsite-details.html',
        controller: ['$scope', function (scope) {
          scope.jobsite = jobsite;
        }]
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
      });
    }

    function deleteJobSite(jobsite) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/jobsites/jobsite-delete.html',
        scope: $scope,
        controller: ['$scope', function (scope) {
          scope.jobsite = jobsite;
          scope.deleteJobSiteConfirm = deleteJobSiteConfirm;
          function deleteJobSiteConfirm(jobsite) {
            scope.$broadcast('Delete:JobSite:Process:Start');
            RestSV
              .delete(ManageJobSitesCnst.jobsites.url(), {
                data: {jobsite_id: jobsite.SiteID}
              })
              .then(function (response) {
                _fetchJobsites();
                toastr.success("JobSite Deleted Successfully.")
                scope.$dismiss();

              })
              .catch(function () {

              })
              .finally(function () {
                scope.$broadcast('Delete:JobSite:Process:End');
              })
          }
        }]
      })
      modalInstance.opened.then(function () {

      });

      modalInstance.result.then(function (selectedItem) {
        $scope.$broadcast('Delete:JobSite:Process:Start');
      }, function () {

      });
    }


    function pageChange() {
      _fetchJobsites();
      $state.go('hm.dashboard.jobSites', {page: $scope.flags.page}, {notify: false});
    }

    function toggleMapView(bool) {
      $scope.params.mapView = bool;
      $state.go('hm.dashboard.jobSites', $scope.params,{reload : true});
    }

    $scope.showFilter = false;
    $scope.filterBtn = function () {
      $scope.showFilter = !$scope.showFilter
    };

    $scope.closeFilter = function () {
      $scope.showFilter = false;
    };

    $scope.search = function () {
      $scope.showSearch = !$scope.showSearch;
      $scope.showFilterDiv = false;
    }

    $scope.filter = function () {
      $scope.showFilterDiv = !$scope.showFilterDiv;
      $scope.showSearch = false;
    }
    $scope.reset = function () {
      $scope.fromDate = '';
      $scope.toDate = '';
      $scope.jobsite = '';
    }

    function toBool(str) {
      return (/^true$/i).test(str);
    }

  }]);
