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
      'ui.router',
      'ui.bootstrap',
      'ngAutocomplete',
      'angularMoment',
      'ngSanitize',
      'infinite-scroll',
      'toastr',
      'LocalStorageModule',
      'HM_RequestHeadersINT',
      'HM_ResponseINT',
      'valdr',
      'HM_RoutesMD',
      'HM_GlobalMD'])
    .config(['$provide','localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst','toastrConfig', _configure])
    .run(['$rootScope','$state','HM_RestSV','localStorageService', function($rootScope, $state, RestSV, localStorageService){
      $rootScope.$state = $state;
      $rootScope.params = {};
      $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });

      $rootScope.userObj = localStorageService.get('userObj');
      var guestSession = localStorageService.get('session');
      if(!$rootScope.userObj && !guestSession){
        RestSV
          .get('/session')
          .then(function(response){
              if(response.data.result && response.data.result.session_id){
                localStorageService.set('session',response.data.result.session_id);
              }
          })
      }
    }]);



  function _configure($provide,localStorageServiceProvider, valdrProvider, ValidationConstraintsCnst,toastrConfig) {


    $provide.decorator('$state', ['$delegate', '$rootScope',function($delegate, $rootScope) {
      $rootScope.$on('$stateChangeStart', function(event, state,toParams,fromState,fromParams) {
        $delegate.next = state;
        $delegate.prev = fromState;
      });
      return $delegate;
    }]);

    angular.extend(toastrConfig, {
      positionClass: 'toast-top-center',
      target: 'body'

    });
    // Setup Local Storage Prefix
    localStorageServiceProvider
      .setPrefix('HM');


    //Setting Up validation Messages
    for(var constraints in ValidationConstraintsCnst){
      var constraintObj = {};
      constraintObj[constraints] = ValidationConstraintsCnst[constraints];
      valdrProvider.addConstraints(constraintObj );
    }

  }


}());
