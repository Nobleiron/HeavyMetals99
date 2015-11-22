angular.module('HM_RequestHeadersINT', [])
  .config(['$httpProvider', function ($httpProvider) {
    ///$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    var _requestHeadersFn = [
      '$q',
      'localStorageService',
      function ($q, localStorageService) {
        var _requestHeaders = function (request) {
           var userObj = localStorageService.get("userObj");

            request.headers["X-API-KEY"] = "123";
            if(userObj){
            request.headers["auth_token"] = localStorageService.get("userObj").auth_token  
            }


          return request || $q.when(request);
        };
        return {request: _requestHeaders};
      }];

    $httpProvider.interceptors.push(_requestHeadersFn);
  }]);
