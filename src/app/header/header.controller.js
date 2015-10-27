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
  .controller('HM_HeaderCtrl', ['$scope','filterFilter','HM_CoreClientStoreSV',function ($scope,filterFilter,ClientStoreSV) {
    /**
     * Represents a book.
     * @constructor
     * @param {string} title - The title of the book.
     * @param {string} author - The author of the book.
     */
    $scope.date = new Date();


    $scope.selectedUser = '';

    $scope.status = {
      isopen: false
    };

    $scope.getUsers = function (search) {
      var filtered = filterFilter(users, search);

      var results = _(filtered)
        .groupBy('group')
        .map(function (g) {
          g[0].firstInGroup = true;  // the first item in each group
          return g;
        })
        .flatten()
        .value();

      console.log(results);

      return results;
    };



    ClientStoreSV
      .get('userObj')
      .then(function(response){

        $scope.userObj = response;
      });
  }]);
