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
      'ngSanitize',
      'infinite-scroll',
      'toastr',
      'LocalStorageModule',
      'HM_RequestHeadersINT',
      'valdr',
      'HM_RoutesMD',
      'HM_GlobalMD'])
    .config(['localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst','$httpProvider', _configure])
    .run(['$rootScope','$state', function($rootScope, $state){
      $rootScope.$state = $state;
      $rootScope.params = {};
    }]);



  function _configure(localStorageServiceProvider, valdrProvider, ValidationConstraintsCnst,$httpProvider) {

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
