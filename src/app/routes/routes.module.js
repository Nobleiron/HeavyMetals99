'use strict';
(function () {
  angular.module("HM_RoutesMD", [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider','HM_RoutesCnst', _configure])
    .run(['$rootScope', '$modal', _run]);


  function _configure($stateProvider, $urlRouterProvider, $locationProvider,Routescnst) {



    for (var state in Routescnst.routes) {
      if (!Routescnst.routes.hasOwnProperty(state)) {
        continue;
      }
      var registerState = Routescnst.routes[state];
      var stateObj = angular.extend({
        resolve: {
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
        ],

        session : ['$rootScope','$q','HM_RestSV','localStorageService',function($rootScope,$q,RestSV,localStorageService){
          var deferred = $q.defer();
          $rootScope.userObj = localStorageService.get('userObj');
          $rootScope.session = $rootScope.session || {};
          var guestSession = localStorageService.get('session');
          if(!$rootScope.userObj && !guestSession && !$rootScope.session.fetched){
            $rootScope.session.fetched = true;
            RestSV
              .head('')
              .then(function(response){
                if(response.headers().session){
                  localStorageService.set('session',response.headers().session);
                  deferred.resolve(true);
                }
              }, function(){
                deferred.resolve(true);
              })
          }else{
            deferred.resolve(true);
          }

          return deferred.promise
        }]
      }
      },registerState);
      $stateProvider
        .state(state, stateObj);
    }
    $urlRouterProvider.otherwise(Routescnst.defaultRoute);
   // $locationProvider.html5Mode(true)
  }

  function _run( $rootScope, $modal) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if(toState.openInModal){
        var modalInstance =  $modal.open({
          templateUrl : toState.templateUrl,
          controller: toState.controller,
          scope: function() {

            var scope = $rootScope.$new();
            scope.modalParams = toParams;
            // Might leak memory
            scope.$on("$stateChangeSuccess", function(){
              modalInstance.close();
            });
            return scope;
        }()
        });



        /**
         * Prevent the transition to the dummy state, stay where you are
         */
        event.preventDefault();

      }

    });

  }

}());
