'use strict';
angular.module('HM_LandingMD')
  .controller('HM_LandingCtrl', ['$scope','$state','filterFilter','HM_LandingCnst','HM_RestSV', function ($scope, $state, filterFilter, landingCnst, RestSV ) {

    /**
     * Represents a book.
     * @constructor
     * @param {string} title - The title of the book.
     * @param {string} author - The author of the book.
     */
    $scope.date = new Date();


    $scope.selectSearchedItem = function(item, model, label){
      var query = '';
      if(typeof $scope.selectedProduct == "object"){
        query = $scope.selectedProduct.Product_Name;
      }
      if(typeof $scope.selectedProduct == "string"){
        query = $scope.selectedProduct;
      }

      $state.go('hm.search', { query : query});

    };

    $scope.selectedProduct = '';

    var users = [{
      name: 'Electric Scissor lift',
      group: 'Equipments'
    },{
      name: 'Electric Scissor lift (Wide)',
      group: 'Equipments'
    },{
      name: 'Electric Scissor lift - 16\"',
      group: 'Equipments'
    }, {
      name: 'Electric transmission of gearbox',
      group: 'Parts'
    }, {
      name: 'Electric gear docket',
      group: 'Parts'
    }, {
      name: 'Expansion Electric Chord',
      group: 'Attachments'
    }, {
      name: 'Advanced Electric resistance socket box',
      group: 'Attachments'
    }
    ];


    $scope.getProducts = function (search) {

      return RestSV.get( landingCnst.search.url() ,{
        search_text : 'lift'
      }).then(function(response){
        var filtered = filterFilter(response.data.result.ProductSearchList, search);

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



    function normalizeSearchQuery(str){
      return str.replace('\'','');
    }

  }]);
