'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",
    ['$scope','$stateParams','HM_RestSV','HM_SearchCnst',
    function($scope, $stateParams, RestSV, SearchCnst){

      $scope.results = [];
      $scope.oneAtATime = true;

      $scope.flags = {
        searchResultLoading : false,
        categoryCollapse : false,
        gridView : false
      };

      $scope.selection = { type : "rent"};

      $scope.addToWishList = addToWishList;

      $scope.toggleGridView = toggleGridView;

      $scope.loadCategories = loadCategories;

      _initialize();

      /**
       * Initialises the controller
       */
      function _initialize(){
        $scope.query = $stateParams.query || '';
        $scope.flags.gridView = $stateParams.viewType == "grid";
        $scope.flags.searchResultLoading = true;
          RestSV
            .get( SearchCnst.search.url() ,{
              search_text : normalizeSearchQuery($scope.query)
            })
            .then(function(response){
              $scope.results = response.data.result.SearchResult;
            })
            .finally(function(){
              $scope.flags.searchResultLoading = false;
            })
        loadCategories();
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


      function loadCategories(){
        RestSV
          .get( SearchCnst.categoryList.url(),{type: $scope.selection.type})
          .then(function(response){
            $scope.categories = response.data.result.CategoryList;
          })
      }

      function addToWishList(product_id){
        RestSV
          .post( SearchCnst.addToWishList.url(),{ product_id : product_id })
          .then(function(response){
          })
          .catch(function(){
          })
      }



    }]);
