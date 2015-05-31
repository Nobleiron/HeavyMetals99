'use strict';

/**
 * @author Example <sanil.m.naik@gmail.com>
 * @copyright 2015 NobleIron. All rights reserved.
 */

/**
 * @namespace HeavyMetals
 */

(function () {

  angular.module('HeavyMetals',
    ['ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'HM_ConfigMD',
      'HM_GlobalMD'])
    .config(['$stateProvider', '$urlRouterProvider', 'HM_RoutesCnst', _configure])
    .run([_run]);


  function _configure($stateProvider, $urlRouterProvider, Routescnst) {
    for (var state in Routescnst.routes) {
      if (!Routescnst.routes.hasOwnProperty(state)) {
        continue;
      }
      $stateProvider
        .state(state, Routescnst.routes[state]);
    }
    $urlRouterProvider.otherwise(Routescnst.defaultRoute);
  }

  function _run() {

  }

}());

