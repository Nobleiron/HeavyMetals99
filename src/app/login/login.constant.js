'use strict';
angular.module('HM_LoginMD')
  .constant('HM_loginCnst', {
    login: {
      url: function () {
        return '/login';
      }
    },
    register: {
      url: function () {
        return '/registration';
      }
    }
  });
