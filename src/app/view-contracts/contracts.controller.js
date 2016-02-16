angular.module("HM_Contracts")
.controller('HM_ContractsCtrl', ['$scope', function($scope){
	$scope.search = function() {
		$scope.showSearch = !$scope.showSearch;
		$scope.showFilterDiv = false;
	}
}])