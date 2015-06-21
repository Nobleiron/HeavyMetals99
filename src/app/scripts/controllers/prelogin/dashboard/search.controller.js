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
