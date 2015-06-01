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
    .run(['$modal','$rootScope',_run]);


  function _configure($stateProvider, $urlRouterProvider, Routescnst) {
    for (var state in Routescnst.routes) {
      if (!Routescnst.routes.hasOwnProperty(state)) {
        continue;
      }

      var stateObj = angular.extend({resolve: {
        PreviousState: [
          "$state",
          function ($state) {
            var currentStateData = {
              name: $state.current.name,
              params: $state.params,
              url: $state.href($state.current.name, $state.params)
            };
            return currentStateData;
          }
        ]
      }},Routescnst.routes[state]);
      $stateProvider
        .state(state, stateObj);
    }
    $urlRouterProvider.otherwise(Routescnst.defaultRoute);
  }

  function _run($modal, $rootScope) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {

      /**
       * if the new state is not "terms", then ignore it
       */
      if(!toState.modal) return;
      /**
       * Open the modal window
       */
      $modal.open({
        templateUrl: toState.templateUrl,
        controller: toState.controller
      });
      /**
       * Prevent the transition to the dummy state, stay where you are
       */
      event.preventDefault();
    })

  }

}());

