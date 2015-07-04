'use strict';
angular.module("HM_ConfigMD")
  .constant('HM_RoutesCnst', {

      routes : {
        'hmPrelogin' : {
          abstract : true,
          views : {
            navbar : {
              templateUrl: 'app/views/templates/prelogin/navbar.html',
              controller: 'HM_PreloginNavbarCtrl'
            },
            footer : {
              templateUrl : 'app/views/templates/prelogin/footer.html'
            },
            '' : {
              template: "<div ui-view></div>"
            }
          }
        },
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
        'landing' : {
          url: '/',
          templateUrl: 'app/views/prelogin/dashboard/landing.html',
          controller: 'HM_PreloginSearchCtrl'
        },
        'hm.dashboard' : {
          url: '/dashboard',
          templateUrl: 'app/views/dashboard/dashboard.html',
          controller: 'HM_DashboardCtrl'
        },
        'hm.sellEquipment' :{
          url : '/equipments/sell',
          templateUrl : 'app/views/equipments/sell-equipments.html',
          controller: 'HM_SellEquipmentCtrl'
        },
        'hm.invoices' : {
              url: '/invoices',
              templateUrl: 'app/views/invoices/invoices.html',
              controller: 'HM_InvoicesCtrl',
              openInModal : true
        },
        'hm.reserveTheEquipment' : {
          url: '/equipments/reserve',
          templateUrl: 'app/views/equipments/reserve.html',
          controller: 'HM_InvoicesCtrl',
          openInModal : true
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
        },
        'hmPrelogin.login' : {
          url: '/login',
          templateUrl: 'app/views/prelogin/login/login.html',
          controller: 'HM_LoginCtrl'
        },
        'hmPrelogin.register' : {
          url: '/register',
          templateUrl: 'app/views/prelogin/login/login.html',
          controller: 'HM_LoginCtrl'
        }

      },
      defaultRoute : '/'

  });
