angular.module('HM_ResponseINT', [])
  .config(['$httpProvider', function ($httpProvider) {
    var _requestHeadersFn = [
      '$q',
      'localStorageService',
      function ($q, localStorageService) {
        var _response = function (response) {

          //var userObj = localStorageService.get("userObj");



          return response

        };
        return {response: _response};
      }];

    $httpProvider.interceptors.push(_requestHeadersFn);
  }]);
