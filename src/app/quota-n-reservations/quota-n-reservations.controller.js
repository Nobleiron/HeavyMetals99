angular.module("HM_QuotaNReservationsMD")
.controller('HM_QuotaNReservationsCtrl', ['$scope', function($scope){
	$scope.showFilter = false;
	$scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    }
}]);
