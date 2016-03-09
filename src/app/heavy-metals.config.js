'use strict';

/**
 * @author Example <sanil.m.naik@gmail.com>
 * @copyright 2015 NobleIron. All rights reserved.
 */

/**
 * @namespace HeavyMetals
 */

(function () {

  angular.module('HeavyMetals')
    .config(['$provide','$animateProvider','localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst','toastrConfig', _configure]);


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
