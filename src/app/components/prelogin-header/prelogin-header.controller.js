angular.module('HeavyMetals')
  .controller('HM_PreloginHeaderCtrl',['$scope','$state','filterFilter','HM_RestSV','HM_PreloginHeaderCnst',function ($scope,$state,filterFilter, RestSV,HeaderCnst) {

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;


    _initialize();

    function selectSearchedItem(item, model, label){
      var query = '';
      if(typeof $scope.selectedProduct == "object"){
        query = $scope.selectedProduct.Product_Name;
      }
      if(typeof $scope.selectedProduct == "string"){
        query = $scope.selectedProduct;
      }

      $state.go('hm.search.results', { query : query},{ reload: true });
    }

    function getProducts(search){
      return RestSV.get( HeaderCnst.search.url() ,{
        search_text : 'lift'
      }).then(function(response){
        var filtered = filterFilter(response.data.result.SearchResult, search);
        var results = _(filtered)
          .groupBy('Category_Name')
          .map(function (g) {
            g[0].firstInGroup = true;  // the first item in each group
            return g;
          })
          .flatten()
          .value();
        return results;
      });
    }

    function _initialize(){
      $scope.selectedProduct = '';
      $scope.flags = {
        rented : true
      }
    }

  }]);
