angular.module("HM_QuotaNReservationsMD")
.controller('HM_QuotaNReservationsCtrl', ['$scope','HM_RestSV','HM_QuotaNReservationsCnst', function($scope,RestSV,QuotaCnst){


    $scope.flags = {
      noQuotations : false
    };

    _fetchQuotations();


    $scope.openDatepicker = openDatepicker


    function openDatepicker(model){
        $scope.queryFormData[model] = !$scope.queryFormData[model];
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
    };

    $scope.filter = function() {
      $scope.showFilterDiv = !$scope.showFilterDiv;
      $scope.showSearch = false;
    };
    $scope.reset = function() {
      $scope.fromDate = '';
      $scope.toDate = '';
      $scope.jobsite = '';
    };

    function _fetchQuotations(){
      $scope.quotationPromise = RestSV
        .get(QuotaCnst.list.url(),{
          category : 'rent'
        })
        .then(function(response){
          if(response.data.result){
            $scope.flags.total_pages = parseInt(response.data.result.Total_pages);
            $scope.flags.qty = response.data.result.No_Of_Record;
            $scope.orders = response.data.result.order_list;
          }else{
            console.log("Err", response)
          }
          $scope.flags.noQuotations = response.data.result == "";
        });
    }


}]);
