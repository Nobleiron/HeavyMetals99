angular.module('HM_RequestHeadersINT', [])
  .config(['$httpProvider', function ($httpProvider) {
    var _requestHeadersFn = [
      '$q',
      function ($q) {
        var _requestHeaders = function (request) {


            request.headers["X-API-KEY"] = "123";

          return request || $q.when(request);
        };
        return {request: _requestHeaders};
      }];

    $httpProvider.interceptors.push(_requestHeadersFn);
  }]);
