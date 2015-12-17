'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",
    ['$scope','$state','$stateParams','HM_RestSV','HM_SearchCnst',
    function($scope, $state, $stateParams, RestSV, SearchCnst){


      $scope.toggleGridView = toggleGridView;

      $scope.selectCategory = selectCategory;

      $scope.selectRootCategory = selectRootCategory;

      _initialize();

      /**
       * Initialises the controller
       */
      function _initialize(){
        $scope.results = [];

        $scope.params = angular.extend({},$stateParams);

        $scope.selectedCategory = { };

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
             $scope.$broadcast('Categories:Loaded', true);
            $scope.flags.searchReady = true;
          })
      }


      /**
       * Toggles a list to 'GRID' or 'LIST' view
       * @param {boolean} bool - set true for grid view. Default is LIST view
       */
      function toggleGridView(bool){
        $scope.flags.gridView = bool;
        $scope.params.view_type = bool ? 'grid' : 'list';
        $state.go('hm.search.results',$scope.params,{notify : false});
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
           $scope.params.category_id = $scope.selectedCategory.Id;
           console.log($scope.params)
           console.log("adsd")
          })
      }

      function selectRootCategory(rootCategory){
        $scope.selectedRootCategory = rootCategory;
        $scope.selectedCategory = $scope.selectedRootCategory.children[0];
      }

      function selectCategory(category){
        $scope.selectedCategory = category;
        $scope.flags.page = 1;
        $scope.params.category_id = $scope.selectedCategory.Id;
        $state.go('hm.search.results',$scope.params);
      }

    }]);
