'use strict';
angular.module("HM_JobSitesMD")
  .controller('HM_JobSitesCtrl', ['$scope', '$state', '$uibModal', 'HM_RestSV', 'HM_JobSitesCnst', function ($scope, $state, $uibModal, RestSV, ManageJobSitesCnst) {

    $scope.jobsites = [];

    $scope.flags = {
      jobSiteFetchInProgress: true,
      page: 1
    };
    $scope.params = angular.extend({listView: false}, $state.params);
    $scope.params.listView = toBool($scope.params.listView);
    $scope.map = {center: {latitude: 41.850033, longitude: -87.6500523}, zoom: 8};

    $scope.viewJobSiteDetails = viewJobSiteDetails;

    $scope.deleteJobSite = deleteJobSite;

    $scope.toggleListView = toggleListView;

    $scope.pageChange = pageChange;

    $scope.$on('JobSite:Update', function (e, jobsite) {
      $scope.jobsites.map(function (j) {
        jobsite.SiteID === j.SiteID && angular.extend(j, jobsite);
      });
    });
    $scope.$on('JobSite:Add', function (e, jobsite) {
      $scope.jobsites = jobsite;
    });

    _fetchJobsites();


    function _fetchJobsites() {
      $scope.jobsitesPromise = RestSV.get(ManageJobSitesCnst.jobsites.url(), {
        page: $scope.flags.page,
        listView : $scope.params.listView
      })
        .then(function (response) {
          if (response.data.result) {
            $scope.flags.page = response.data.result.Page;
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
                $scope.jobsites = response.data.result.JobSite_Details;
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
      $state.go('hm.dashboard.invoices', {page: $scope.flags.page}, {notify: false});
    }

    function toggleListView(bool) {
      $scope.params.listView = bool;
      $state.go('hm.dashboard.jobSites', $scope.params);
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
