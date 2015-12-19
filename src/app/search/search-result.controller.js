'use strict';
angular.module("HM_SearchMD")
  .controller("HM_SearchResultCtrl", ['$scope','$state','$stateParams','HM_RestSV','HM_SearchCnst',
    function($scope,$state, $stateParams, RestSV, SearchCnst){


      $scope.addToWishList = addToWishList;

      $scope.lazyLoadSearchResult = lazyLoadSearchResult;

      $scope.clearSearchTag = clearSearchTag;

      !angular.equals({},$scope.selectedCategory) ? _initialize() : $scope.$on('Categories:Loaded', _initialize);

      function _initialize(event,fresh){
        $scope.flags.gridView = $stateParams.view_type == "grid";
        $scope.searchTags = [];
        jQuery.extend($scope.params,$stateParams);

        $scope.params.query = $scope.params.query || '';
        _buildSearchTags();
        if($scope.params.query){
          _getSearchResult(fresh);
        }else{
          _getProductListFromSelectedCategory(fresh);
        }
      }


      function _buildSearchTags(){
        for(var param in $scope.params){
          if(param == "query" && $scope.params.query){
            $scope.searchTags.push({name : "Search:" + $scope.params.query, tagType : 'query'});
          }
          //if(param == "category_id" && $scope.params.category_id){
          //  $scope.searchTags.push(_getCategoryById($scope.params[param]));
          //}
        }
      }

      function clearSearchTag(tagType){
         $scope.params[tagType] = undefined;
        $scope.searchTags = _.filter($scope.searchTags, function(tag){
          return tag.tagType != tagType;
        });
        $state.go('hm.search.results', $scope.params);
      }

      function _getCategoryById(category_id){
       var selectedCategory= _.find($scope.categories,function(x){
          return x.Id == category_id;
        });
        return { name : 'Filter:'+ selectedCategory.Name, tagType : 'category_id'};
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
        if($scope.flags.categoriesFetched){
          $scope.params.query ? _getSearchResult() : _getProductListFromSelectedCategory();
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
            category_id : $scope.params.category_id
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
            if($scope.flags.page && !$scope.results.length){
              $scope.userQuery = true;
            }
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
          $scope.flags.stopPaging = false;
        }
        if(!$scope.flags.stopPaging && !$scope.flags.resultFetching){
          $scope.flags.resultFetching = true;
          $scope.flags.searchResultLoading = true;
          RestSV
            .get( SearchCnst.search.url() ,{
              search_text : normalizeSearchQuery($scope.params.query),
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
