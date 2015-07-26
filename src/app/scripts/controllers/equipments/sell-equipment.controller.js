'use strict';
angular.module("HM_EquipmentsMD")
  .controller("HM_SellEquipmentCtrl",['$scope','Upload', function($scope, Upload){


    function soap() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://localhost:3000/xxx', true);

      // build SOAP request
      var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://www.northgate-is.com/proiv/webservices/types">'+
      '<soapenv:Header/>'+
      '<soapenv:Body>'+
      '<typ:TK_WS_EMAIL_LOGIN>'+
      '<T_EMAIL>rajesh.thinktech@gmail.com</T_EMAIL>'+
      '<T_PASSWORD>password</T_PASSWORD>'+
      '<T_ENCRYPTED/>'+
      '</typ:TK_WS_EMAIL_LOGIN>'+
      '</soapenv:Body>'+
      '</soapenv:Envelope>';

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {

            alert('done use firebug to see response');
          }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
      // send request
      // ...
    }

    soap();

    //$.soap({
    //  url: 'http://localhost:3000/soapservices/',
    //  method: 'TK_WS_EMAIL_LOGIN',
    //  data: {
    //      'T_EMAIL' : 'rajesh.thinktech@gmail.com',
    //      'T_PASSWORD' : 'password'
    //  },
    //  appendMethodToURL : 'appU',
    //  SOAPAction : 'soapac',
    //  namespaceQualifier: 'nq',
    //  namespaceURL: 'nU',
    //  noPrefix: 'np',
    //  elementName: 'eN',
    //
    //  enableLogging: 'eL',
    //
    //  context: 'c',
    //  success: function (soapResponse) {
    //    // do stuff with soapResponse
    //    // if you want to have the response as JSON use soapResponse.toJSON();
    //    // or soapResponse.toString() to get XML string
    //    // or soapResponse.toXML() to get XML DOM
    //  },
    //  error: function (SOAPResponse) {
    //    // show error
    //  }
    //});

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: 'upload/url',
            fields: {'username': $scope.username},
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
      }
    };


  }]);
