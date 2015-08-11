'use strict';
(function () {
  angular.module("HM_ConfigMD", [])
    .config(['localStorageServiceProvider','valdrProvider','ValidationConstraintsCnst', _configure])

  function _configure(localStorageServiceProvider,valdrProvider,ValidationConstraintsCnst) {

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
