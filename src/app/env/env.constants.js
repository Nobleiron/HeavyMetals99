angular.module("HM_EnvMD")
  .constant('HM_EnvCnst', {

    current : 'development',

    development : {
      restEndPoint : 'http://52.88.68.50/index.php'
    },

    staging : {
      restEndPoint : 'http://52.88.68.50/index.php/'
    },
    production : {
      restEndPoint : 'http://52.88.68.50/index.php/'
    }

  });
