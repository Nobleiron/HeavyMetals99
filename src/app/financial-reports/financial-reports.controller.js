angular.module("HM_FinancialReportsMD")
  .controller('HM_FinancialReportsCtrl', ['$scope','HM_RestSV','HM_FinancialReportsCnst','toastr', function($scope,RestSV,FinancialReportsCnst,toastr){

    _initialize();

    function _initialize(){
      _fetchFinancialReports();
    }


    function _fetchFinancialReports(){
      $scope.fetchDataInProgress= true;
      RestSV.get(FinancialReportsCnst.list.url())
        .then(function(response){
          $scope.releases = response.data.result.Press_release;
        })
        .catch(function(error){
          $scope.releases = [];
          toastr.error('Failed to fetch Press Releases');
        })
        .finally(function(){
          $scope.fetchDataInProgress= false;
        })
    }

  }]);
