angular.module('HM_ResponseINT', [])
  .config([
  '$httpProvider',
  function ($httpProvider) {
    var sessionInterceptor = [
      '$q',
      '$location',
      function ($q, $location) {

        return {

          'responseError': function (response) {
            if (response.status == 401 && response.data.errortext == "Unauthorized User") {


              $location.path('/logout');

              return $q.reject(response);
            }
          }

        }
      }];

    $httpProvider.interceptors.push(sessionInterceptor);

  }]);
