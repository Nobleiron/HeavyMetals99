angular.module("HeavyMetals")
  .constant('ValidationConstraintsCnst', {

      'User': {
        'credentials' : {
          'required' : {
            'message' : 'Invalid email or password'
          }
        },
        'firstName' : {
          'required' : {
              'message' : "First Name is required"
          }
        },
        'lastName' : {
          'required' : {
            'message' : "Last Name is required"
          }
        },
        'email': {
          'email': {
            'message' : 'Please enter valid Email'
          },
          'required': {
            'message': 'Email is required.'
          }
        },
        'password': {
          'required': {
            'message': 'Password is required.'
          }
        }
      },
    'UserRegister': {
      'alreadyExists' : {
        'required' : 'User already exist with this email'
      },
      'firstName' : {
        'required' : {
          'message' : "First Name is required"
        }
      },
      'lastName' : {
        'required' : {
          'message' : "Last Name is required"
        }
      },
      'email': {
        'email': {
          'message' : 'Please enter valid Email'
        },
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
