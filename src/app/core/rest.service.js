'use strict';
angular.module('HeavyMetals')
  .provider('HM_RestSV', [ function(){


    var _that =  this;
    var HTTP;


    function HM_Http(){
        this.get = function(url, params){
            return HTTP.get(_that.apiEndPoint + url,{params : params});
        };
        this.put = function(url,config){
            return HTTP.put(_that.apiEndPoint + url, config);
        };
        this.post = function(url, config){
            return HTTP.post(_that.apiEndPoint + url, config);
        };
        this.delete = function(url,config){
          angular.extend(config , {data : jQuery.param(config.data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          return HTTP.delete(_that.apiEndPoint + url,config);
        };
        this.head = function(url, config){
          return HTTP.head(_that.apiEndPoint + url, config);
        };
    }

    this.setProperties = function(prop, value){
      if(typeof prop == "object" && typeof value == "undefined"){
        //angular.extend(defaultOptions, prop);
      }
      if(typeof prop == "string"){
       // defaultOptions[prop] = value;
      }
    };


    this.$get = ['$http','HM_EnvCnst',function($http, EnvCnst){
      this.env =  EnvCnst.current;
      HTTP = $http;
      this.apiEndPoint = EnvCnst[this.env].restEndPoint
      return new HM_Http()
    }];
  }]);
