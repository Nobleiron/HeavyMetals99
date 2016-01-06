angular.module("HM_QuotaNReservationsMD")
.controller('HM_QuotaNReservationsCtrl', ['$scope', function($scope){
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
}]);
