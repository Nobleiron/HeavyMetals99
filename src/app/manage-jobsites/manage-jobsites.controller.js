'use strict';
angular.module("HM_ManageJobSitesMD")
  .controller('HM_ManageJobSitesCtrl', ['$scope', '$http', function($scope, $http){
    // $scope.showFilter = false;
    $scope.flags = {
      listView : false
    };
    $scope.toggleListView  = toggleListView;
    $scope.filterBtn = function() {
      $scope.showFilter = !$scope.showFilter
    }

    $scope.closeFilter = function() {
        $scope.showFilter = false;
    }
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.randomMarkers = [{ id : 34,latitude: 21, longitude: 78 }];

    //TODO

    //$http.post('http://52.88.68.50/index.php/jobsiteaddress/addjobsiteaddress',{"jobname":"DLF","adddress1":"barasat","city":"kolkata","state":"WB","zip":700126,"phone": 234234})
    //  .then(function(){
    //    debugger
    //  })
    //  .catch(function(){
    //    debugger
    //  })

    function toggleListView(option){
      $scope.flags.listView = !$scope.flags.listView;
    }

  }]);
