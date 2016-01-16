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
    .config(['localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst','toastrConfig', _configure])
    .run(['$rootScope','$state', function($rootScope, $state){
      $rootScope.$state = $state;
      $rootScope.params = {};
      $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    }]);



  function _configure(localStorageServiceProvider, valdrProvider, ValidationConstraintsCnst,toastrConfig) {

    angular.extend(toastrConfig, {
      positionClass: 'toast-top-center',
      maxOpened :1,
      preventDuplicates: true,
      preventOpenDuplicates: true,
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
