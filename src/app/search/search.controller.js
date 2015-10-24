'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",['$scope','$stateParams','HM_RestSV','HM_LandingCnst', function($scope, $stateParams, RestSV, landingCnst){


    if($stateParams.query){
      RestSV.get( landingCnst.search.url() ,{
        search_text : $stateParams.query.replace('\'','')
      }).then(function(response){
        $scope.results = response.data.result.ProductSearchList;
      })
    }



    $scope.toggleGridView = function(bool){
      $scope.gridView = bool;
    }


  }]);
