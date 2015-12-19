'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchResultCtrl", ['$scope','$stateParams','HM_RestSV','HM_SearchCnst',
    function($scope, $stateParams, RestSV, SearchCnst){


      $scope.addToWishList = addToWishList;

      $scope.lazyLoadSearchResult = lazyLoadSearchResult;

      !angular.equals({},$scope.selectedCategory) ? _initialize() : $scope.$on('Categories:Loaded', _initialize);

      function _initialize(event,fresh){
        $scope.query = $stateParams.query || '';
        $scope.flags.gridView = $stateParams.view_type == "grid";
        console.log("initialized")
        if($scope.query){
          _getSearchResult();

        }else{
          _getProductListFromSelectedCategory(fresh);
        }
      }

      function addToWishList(product){
        RestSV
          .post( SearchCnst.addToWishList.url(),{ product_id : product.Product_Id })
          .then(function(response){
            product.addedToWishlist = true;
            $scope.addedToWishlist = true;
          })
          .catch(function(){
          })
      }


      function lazyLoadSearchResult(){
        console.log("lazy loaded")
        if($scope.flags.categoriesFetched){
          $scope.query ? _getSearchResult() : _getProductListFromSelectedCategory();
        }
      }

      function _getProductListFromSelectedCategory(fresh){
        if(fresh){
          $scope.results = [];
          $scope.flags.page = 1;
        }
        $scope.flags.searchResultLoading = true;
        RestSV
          .get( SearchCnst.productByCategory.url(),{
            page : $scope.flags.page,
            category_id : $stateParams.category_id || $scope.params.category_id
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

      function normalizeSearchQuery(str){
        return str.replace('\'','');
      }

      function _getSearchResult(fresh){
        if(fresh){
          $scope.results = [];
          $scope.flags.page = 1;
        }
        if(!$scope.flags.stopPaging && !$scope.flags.resultFetching){
          $scope.flags.resultFetching = true;
          $scope.flags.searchResultLoading = true;
          RestSV
            .get( SearchCnst.search.url() ,{
              search_text : normalizeSearchQuery($scope.query),
              page : $scope.flags.page,
              category_id : $scope.params.category_id
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
              if($scope.flags.page && !$scope.results.length){
                $scope.userQuery = true;
              }
              $scope.flags.searchResultLoading = false;
            })
        }
      }

    }]);
