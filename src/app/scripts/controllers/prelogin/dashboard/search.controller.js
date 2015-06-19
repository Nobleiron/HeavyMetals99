'use strict';
angular.module('HM_PreloginSearchMD')
  .controller('HM_PreloginSearchCtrl', ['$scope','filterFilter', function ($scope,filterFilter) {

    /**
     * Represents a book.
     * @constructor
     * @param {string} title - The title of the book.
     * @param {string} author - The author of the book.
     */
    $scope.date = new Date();


    $scope.selectedUser = '';

    var users = [{
      name: 'test',
      group: 'Equipments'
    }, {
      name: 'test1',
      group: 'Parts'
    }, {
      name: 'Test user3',
      group: 'Attachments'
    }, {
      name: 'Test user1',
      group: 'Attachments'
    }, {
      name: 'Test user3',
      group: 'Parts'
    },
    ];

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
    }

  }]);
