'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",
  ['$scope','$state','$stateParams','HM_RestSV','HM_SearchCnst','toastr',
    function($scope, $state, $stateParams, RestSV, SearchCnst,toastr){


      $scope.toggleGridView = toggleGridView;

      $scope.selectCategory = selectCategory;

      $scope.selectRootCategory = selectRootCategory;

      $scope.selectCategoryAttributes = selectCategoryAttributes;

      $scope.$on('Cart:Count:Fetched', function(e, data){
      });


      _initialize();

      function _initialize(){
        $scope.results = [];
        angular.extend($scope.params,$stateParams);
        $scope.selectedAttributes = {};
        //$scope.selectedCategory = {};
        $scope.selection = { type : "rent"};
        $scope.flags = {
          searchResultLoading : false,
          categoryCollapse : false,
          gridView : false,
          page : 1,
          resultFetching : false,
          stopPaging : false,
          selectedCategory : {},
          categoriesFetched: false,
          userQuery : false
        };

        $scope.categories = [];

        $scope.filterBtn = function() {
          $scope.showFilter = !$scope.showFilter
        };
        loadCategories()
          .then(function(){
            $scope.$broadcast('Categories:Loaded', true);
            $scope.flags.categoriesFetched = true;
          })
      }


      /**
       * Toggles a list to 'GRID' or 'LIST' view
       * @param {boolean} bool - set true for grid view. Default is LIST view
       */
      function toggleGridView(bool){
        $scope.flags.gridView = bool;
        $scope.params.view_type = bool ? 'grid' : 'list';
        $state.go('hm.search.results',$scope.params);
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
            $scope.categories = $scope.selectedRootCategory.children;
            buildAttributeMap();
            $scope.flags.selectedCategory = $scope.params.category_id ? _.find($scope.categories,function(x){
              return x.Id == $scope.params.category_id;
            }) : $scope.categories[0];
            $scope.params.category_id = $scope.flags.selectedCategory.Id;
          })
          .catch(function(){
            toastr.error('Something went wrong','Error')
          })
      }


      function selectDefaultCategory(){

      }


      function _getCategoryById(category_id){
        var selectedCategory= _.find($scope.categories,function(x){
          return x.Id == category_id;
        });
        return { name : 'Filter:'+ selectedCategory.Name, tagType : 'category_id'};
      }




      function selectRootCategory(rootCategory){
        $scope.selectedRootCategory = rootCategory;
        $scope.flags.selectedCategory = $scope.selectedRootCategory.children[0];
      }

      function selectCategory(category){
        $scope.flags.selectedCategory = category;
        $scope.flags.page = 1;
        $scope.params['attributes'] = [];
        $scope.params.attributes = undefined;
        $scope.params.category_id = $scope.flags.selectedCategory.Id;
        buildAttributeMap();
        $state.go('hm.search.results',$scope.params);
      }

      function selectCategoryAttributes(event, attribute, attributeValue){
        var idx = _.find($scope.selectedAttributes[attribute], function(x){ return x == attributeValue});
        if (idx) {
          $scope.selectedAttributes[attribute].splice(idx, 1);
        }
        else {
          $scope.selectedAttributes[attribute].push(attributeValue);
        }
        $scope.flags.page = 1;
        normalizeCategoryAttributes();
        console.log("$scope.selectedAttributes",$scope.selectedAttributes)
        event.stopPropagation();
        $state.go('hm.search.results',$scope.params);

      }

      function normalizeCategoryAttributes(){
        $scope.params['attributes'] = []
        angular.forEach($scope.selectedAttributes, function(value,key){
          value.length && ($scope.params['attributes'].push(key + '~'+ value.join(',')))
        })
      }


      function buildAttributeMap(){
        $scope.selectedAttributes = {};
        $scope.categories.forEach(function(category){
          if(category.Attribute.length){
            category.Attribute.forEach(function(attribute){
              $scope.selectedAttributes[attribute.Attribute_slug] = [];
            });
          }
        });

      }

    }]);
