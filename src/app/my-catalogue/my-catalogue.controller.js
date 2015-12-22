angular.module("HM_MyCatalogueMD")
.controller('HM_MyCatalogueCtrl', ['$scope', function($scope){
	$scope.showFilter = false;
	$scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    }

}])
