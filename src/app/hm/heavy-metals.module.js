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
      'ngSanitize',
      'pouchdb',
      'LocalStorageModule',
      'HM_RequestHeadersINT',
      'valdr',
      'HM_RoutesMD',
      'HM_GlobalMD'])
    .config(['localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst','$httpProvider', _configure]);



  function _configure(localStorageServiceProvider, valdrProvider, ValidationConstraintsCnst) {

    // Setup Local Storage Prefix
    localStorageServiceProvider
      .setPrefix('HM_');

    //Setting Up validation Messages
    for(var constraints in ValidationConstraintsCnst){
      var constraintObj = {};
      constraintObj[constraints] = ValidationConstraintsCnst[constraints];
      valdrProvider.addConstraints(constraintObj );
    }

  }


}());
