'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchCtrl",
    ['$scope','$stateParams','HM_RestSV','HM_SearchCnst',
    function($scope, $stateParams, RestSV, SearchCnst){

      $scope.results = [];

      $scope.oneAtATime = true;
      $scope.selection = { type : "rent"};
      $scope.flags = {
        searchResultLoading : false,
        categoryCollapse : false,
        gridView : false,
        page : 1,
        resultFetching : false,
        stopPaging : false,
        searchReady: false
      };
      $scope.categories = [];

      $scope.filterBtn = function() {
        $scope.showFilter = !$scope.showFilter
      }

      $scope.lazyLoadSearchResult = lazyLoadSearchResult;

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
        loadCategories()
          .then(function(){
            if($scope.query){
              _getSearchResult();
              $scope.flags.searchReady = true;
            }else{
              _getProductListFromSelectedCategory();
            }
          });
      }

      function _getProductListFromSelectedCategory(){
        RestSV
          .get( SearchCnst.productByCategory.url(),{
            page : $scope.flags.page,
            category_slag : $scope.selectedCategory.children[0].Slug
          })
          .then(function(response){
            if(response.data.result == ""){
              $scope.flags.stopPaging = true;
            }else{
              $scope.results = $scope.results.concat(response.data.result.ProductList);
              $scope.flags.page += 1 ;
            }
          })
          .finally(function(){
            $scope.flags.resultFetching = false;
            $scope.flags.searchResultLoading = false;
          })
      }

      function _getSearchResult(){
        if(!$scope.flags.stopPaging && !$scope.flags.resultFetching){
          $scope.flags.resultFetching = true
          RestSV
            .get( SearchCnst.search.url() ,{
              search_text : normalizeSearchQuery($scope.query),
              page : $scope.flags.page
            })
            .then(function(response){
              if(response.data.result == ""){
                  $scope.flags.stopPaging = true;
              }else{
                $scope.results = $scope.results.concat(response.data.result.SearchResult);
                $scope.flags.page += 1 ;
              }
            })
            .finally(function(){
              $scope.flags.resultFetching = false;
              $scope.flags.searchResultLoading = false;
            })
        }
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
            $scope.categories = response.data.result.CategoryList;
            $scope.categories.forEach(function(c){
              c.categoryDisplaySortOrder = SearchCnst.categoryDisplaySortOrder[c.Name];
            });
            $scope.selectedCategory = $scope.categories[0];
          })
      }

      function addToWishList(product){
        RestSV
          .post( SearchCnst.addToWishList.url(),{ product_id : product.Product_Id })
          .then(function(response){
            product.addedToWishlist = true;
          })
          .catch(function(){
          })
      }

      function lazyLoadSearchResult(){
        if($scope.categories.length){
          $scope.query ? _getSearchResult() : _getProductListFromSelectedCategory();
        }
      }



      function _normalizeCategories(crudeCategories){
        var categories = {};
        crudeCategories.forEach(function(c){
          categories[c.Name] = c;

        });
        return categories;
      }



    }]);
