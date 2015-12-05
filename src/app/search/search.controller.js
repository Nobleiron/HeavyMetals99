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
        stopPaging : false
      };

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
        _getSearchResult();
        loadCategories();
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
        RestSV
          .get( SearchCnst.categoryList.url(),{type: $scope.selection.type})
          .then(function(response){
            $scope.categories = _normalizeCategories(response.data.result.CategoryList);
            $scope.selectedCategory = $scope.categories["Equipment"];
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

      function lazyLoadSearchResult(){
        _getSearchResult();
      }



      function _normalizeCategories(crudeCategories){
        var categories = {};
        crudeCategories.forEach(function(c){
          categories[c.Name] = c;
        });
        return categories;
      }



    }]);
