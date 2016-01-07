angular.module("HM_MyCatalogueMD")
.controller('HM_MyCatalogueCtrl', ['$scope','HM_RestSV','HM_MyCatalogueCnst', function($scope, RestSV, MyCatalogueCnst){
	$scope.showFilter = false;
	$scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    };

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    };

    _initialize();

    function _initialize(){
      $scope.productFetchInProgress= true;
      RestSV.get(MyCatalogueCnst.list.url())
        .then(function(response){
          $scope.catelog = response.data.result.ProductList;
          $scope.productFetchInProgress= false;
        })
        .catch(function(error){
          debugger
        })
    }
}]);
