'use strict';
(function () {
  angular.module("HM_RoutesMD", [])
    .config(['$stateProvider', '$urlRouterProvider', 'HM_RoutesCnst', _configure])
    .run(['$rootScope', '$modal', _run]);


  function _configure($stateProvider, $urlRouterProvider, Routescnst) {



    for (var state in Routescnst.routes) {
      if (!Routescnst.routes.hasOwnProperty(state)) {
        continue;
      }
      var registerState = Routescnst.routes[state];
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
      }},registerState);
      $stateProvider
        .state(state, stateObj);
    }
    $urlRouterProvider.otherwise(Routescnst.defaultRoute);
  }

  function _run( $rootScope, $modal) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {


      if(toState.openInModal){
        var modalInstance =  $modal.open({
          templateUrl : toState.templateUrl,
          controller: toState.controller,
          resolve: {
            modalParams : toParams,
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
          }
        })



        /**
         * Prevent the transition to the dummy state, stay where you are
         */
        event.preventDefault();

      }

    });

  }

}());
