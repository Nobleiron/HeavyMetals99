'use strict';
angular.module("HM_ConfigMD")
  .constant('HM_RoutesCnst', {

      routes : {
        'hm' :{
          abstract : true,
          views : {
            navbar : {
              templateUrl: 'app/views/templates/navbar.html',
              controller: 'HM_NavbarCtrl'
            },
            '' : {
              template: "<div ui-view></div>"
            }
          }
        },
        'hm.dashboard' : {
          url: '/dashboard',
          templateUrl: 'app/views/dashboard/dashboard.html',
          controller: 'HM_DashboardCtrl'
        },
        'hm.sellEquipment' :{
          url : '/sell-your-equipments',
          templateUrl : 'app/views/equipments/sell-equipments.html',
          controller: 'HM_SellEquipmentCtrl'
        },
        'hm.invoices' : {
              url: '/invoices',
              templateUrl: 'app/views/invoices/invoices.html',
              controller: 'HM_InvoicesCtrl'
        },
        'hm.manageJobSite' : {
          url: '/manage/job-sites',
          templateUrl: 'app/views/jobsites/manage.html',
          controller: 'HM_ManageJobSitesCtrl'
        },
        'hm.requests' : {
          url: '/requests',
          templateUrl: 'app/views/requests/requests.html',
          controller: 'HM_RequestsCtrl'
        }

      },
      defaultRoute : '/dashboard'

  });
