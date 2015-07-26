'use strict';
(function () {
  angular.module("HM_ConfigMD", [])
    .config(['localStorageServiceProvider', _configure])

  function _configure(localStorageServiceProvider) {

    localStorageServiceProvider
      .setPrefix('HM_');
  }

}());
