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
      'cgBusy',
      'infinite-scroll',
      'toastr',
      'LocalStorageModule',
      'HM_RequestHeadersINT',
      'HM_ResponseINT',
      'valdr',
      'HM_RoutesMD',
      'HM_GlobalMD'])
    .config(['$provide','$animateProvider','localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst','toastrConfig', _configure])
    .run(['$rootScope','$state','HM_RestSV','localStorageService', function($rootScope, $state, RestSV, localStorageService){
      $rootScope.$state = $state;
      $rootScope.params = {};
      $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });

      $rootScope.userObj = localStorageService.get('userObj');

    }]);



  function _configure($provide,$animateProvider,localStorageServiceProvider, valdrProvider, ValidationConstraintsCnst,toastrConfig) {

    $animateProvider.classNameFilter(/^((?!(fa-spinner)).)*$/);

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
