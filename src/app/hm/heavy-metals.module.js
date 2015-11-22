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
      'datePicker',
      'ui.bootstrap',
      'ngSanitize',
      'LocalStorageModule',
      'HM_RequestHeadersINT',
      'valdr',
      'HM_RoutesMD',
      'HM_GlobalMD'])
    .config(['localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst','$httpProvider', _configure]);



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
