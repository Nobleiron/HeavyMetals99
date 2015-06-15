'use strict';
(function () {
  angular.module("HM_ConfigMD", [])
    .config(['$stateProvider', '$urlRouterProvider','localStorageServiceProvider', 'HM_RoutesCnst', _configure])
    .run([_run]);


  function _configure($stateProvider, $urlRouterProvider, localStorageServiceProvider, Routescnst) {

    localStorageServiceProvider
      .setPrefix('HM_');


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


  }

}());
