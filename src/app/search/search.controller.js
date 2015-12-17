'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",
    ['$scope','$stateParams','HM_RestSV','HM_SearchCnst',
    function($scope, $stateParams, RestSV, SearchCnst){




      $scope.toggleGridView = toggleGridView;

      $scope.loadCategories = loadCategories;

      $scope.selectCategory = selectCategory;

      $scope.selectRootCategory = selectRootCategory;



      _initialize();

      /**
       * Initialises the controller
       */
      function _initialize(){
        $scope.results = [];

        $scope.selectedCategory = { };

        $scope.oneAtATime = true;
        $scope.selection = { type : "rent"};
        $scope.flags = {
          searchResultLoading : false,
          categoryCollapse : false,
          gridView : false,
          page : 1,
          resultFetching : false,
          stopPaging : false,
          searchReady: false,
          userQuery : false
        };

        $scope.categories = [];

        $scope.filterBtn = function() {
          $scope.showFilter = !$scope.showFilter
        };
        $scope.flags.searchResultLoading = true;
        loadCategories()
          .then(function(){
            console.log("fooo")
             $scope.$broadcast('Categories:Loaded');
            $scope.flags.searchReady = true;
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


      function loadCategories(){
       return RestSV
          .get( SearchCnst.categoryList.url(),{type: $scope.selection.type})
          .then(function(response){
            $scope.rootCategories = response.data.result.CategoryList;
            $scope.rootCategories.forEach(function(c){
              c.categoryDisplaySortOrder = SearchCnst.categoryDisplaySortOrder[c.Name];
            });
            $scope.selectedRootCategory = $scope.rootCategories[0];
           $scope.selectedCategory = $scope.selectedRootCategory.children[0];
          })
      }







      function _normalizeCategories(crudeCategories){
        var categories = {};
        crudeCategories.forEach(function(c){
          categories[c.Name] = c;

        });
        return categories;
      }

      function selectRootCategory(rootCategory){
        $scope.selectedRootCategory = rootCategory;
        $scope.selectedCategory = $scope.selectedRootCategory.children[0];
      }

      function selectCategory(category){
        $scope.selectedCategory = category;
        $scope.query ? _getSearchResult(true) : _getProductListFromSelectedCategory(true);
      }

    }]);
