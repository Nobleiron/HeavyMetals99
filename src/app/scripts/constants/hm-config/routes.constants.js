'use strict';
angular.module("HM_ConfigMD")
  .constant('HM_RoutesCnst', {

      routes : {

        'dashboard' : {
          url: '/',
          templateUrl: 'app/views/dashboard/dashboard.html',
          controller: 'HM_DashboardCtrl'
        }

      },
      defaultRoute : '/'

  });
