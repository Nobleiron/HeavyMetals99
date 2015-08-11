angular.module("HM_ConfigMD")
  .constant('ValidationConstraintsCnst', {

      'User': {
        'email': {
          'required': {
            'message': 'Email is required.'
          }
        },
        'password': {
          'required': {
            'message': 'Password is required.'
          }
        }
      }


  });
