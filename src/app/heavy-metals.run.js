'use strict';

/**
 * @author Example <sanil.m.naik@gmail.com>
 * @copyright 2015 NobleIron. All rights reserved.
 */

/**
 * @namespace HeavyMetals
 */

(function () {

  angular.module('HeavyMetals')
    .run(['$rootScope','$state','HM_RestSV','localStorageService', _run]);


  function _run($rootScope, $state, RestSV, localStorageService){
    $rootScope.$state = $state;
    $rootScope.params = {};
    $rootScope.$on('$stateChangeSuccess', function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    $rootScope.userObj = localStorageService.get('userObj');
  }


}());
