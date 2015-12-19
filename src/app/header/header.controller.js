'use strict';
/**
 * @ngdoc directive
 * @name rfx.directive:rAutogrow
 * @element textarea
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * **Note:** ie<9 needs pollyfill for window.getComputedStyle
 *
 * @example
 <example module="rfx">
 <file name="index.html">
 <textarea ng-model="text"rx-autogrow class="input-block-level"></textarea>
 <pre>{{text}}</pre>
 </file>
 </example>
 */
angular.module('HeavyMetals')
  .controller('HM_HeaderCtrl', ['$scope','$state','filterFilter','HM_RestSV','HM_HeaderCnst','localStorageService',function ($scope,$state,filterFilter, RestSV,HeaderCnst, localStorageService) {

    $scope.getProducts = getProducts;

    $scope.selectSearchedItem = selectSearchedItem;

    $scope.takeMeToHome = takeMeToHome;


    _initialize();

    function selectSearchedItem(item, model, label){
      var query = '';
      if(typeof $scope.selectedProduct == "object"){
        query = $scope.selectedProduct.Product_Name;
      }
      if(typeof $scope.selectedProduct == "string"){
        query = $scope.selectedProduct;
      }

      $state.go('hm.search', { query : query},{ reload: true });
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
      };
      $scope.userObj = localStorageService.get('userObj');
    }

    $scope.$on("PortalAccess:Granted", function(){
      $scope.userObj = localStorageService.get('userObj');
    });

    $scope.toggleHeader = function() {
      $scope.showHeader = !$scope.showHeader
    };


    function takeMeToHome(){
      if($scope.userObj.portal_login){
        $state.go('hm.dashboard.main');
      }else{
        $state.go('hm.search.results');
      }
    }

  }]);
