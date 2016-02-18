angular.module("HM_QuotaNReservationsMD")
.controller('HM_QuotaNReservationsCtrl', ['$scope','HM_RestSV','HM_QuotaNReservationsCnst', function($scope,RestSV,QuotaCnst){
	$scope.showFilter = false;
	$scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    }

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

    $scope.openDatepicker = openDatepicker



    $scope.flags = {
      ordersFetched : false
    };
    RestSV
      .get(QuotaCnst.list.url(),{
        category : 'rent'
      })
      .then(function(response){
        if(response.data.result){
          $scope.orders = response.data.result.order_list;
        }else{
          console.log("Err", response)
        }

        $scope.flags.ordersFetched = true;
      });

    function openDatepicker(model){
        $scope.queryFormData[model] = !$scope.queryFormData[model];
    }
}]);
