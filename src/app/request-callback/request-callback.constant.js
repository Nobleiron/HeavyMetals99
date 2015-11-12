'use strict';
angular.module('HM_RequestCallbackMD')
  .constant('HM_RequestCallbackCnst', {
    requestCallback : {
      url : function(){
        return 'https://vcc-na7.8x8.com/SC/webcallback.php?tenant=nobleiron01&token=17be1b3c8ee6dedf5ea04858c1144d7f&phone="+p1+p2+"&callback_type=1&channel_number=18558971084&back=http://54.191.70.107/old/CI/phone/test/10'
      }
    }
  });
