'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",
    ['$scope','$stateParams','HM_RestSV','HM_LandingCnst',
    function($scope, $stateParams, RestSV, landingCnst){

      $scope.results = [];
      $scope.flags = {
        loading : false,
        gridView : false
      };


      $scope.toggleGridView = toggleGridView;

      _initialize();

      /**
       * Initialises the controller
       */
      function _initialize(){
        $scope.query = $stateParams.query || '';
        $scope.flags.loading = true;
          RestSV
            .get( landingCnst.search.url() ,{
              search_text : normalizeSearchQuery($scope.query)
            })
            .then(function(response){
              $scope.results = response.data.result.ProductSearchList;
            })
            .finally(function(){
              $scope.flags.loading = false;
            })
      }

      /**
       * Toggles a list to 'GRID' or 'LIST' view
       * @param {boolean} bool - set true for grid view. Default is LIST view
       */
      function toggleGridView(bool){
        $scope.flags.gridView = bool;
      }

      function normalizeSearchQuery(str){
        return str.replace('\'','');
      }

    }]);
