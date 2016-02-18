'use strict';
angular.module('HM_ForgotPasswordMD')
  .constant('HM_ForgotPasswordCnst', {
    forgotPassword: {
      url: function () {
        return '/registration/forgotPassword';
      }
    }
  });
