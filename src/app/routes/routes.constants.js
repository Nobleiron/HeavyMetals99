'use strict';
angular.module("HM_RoutesMD")
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
            footer : {
              templateUrl : 'app/views/templates/footer.html'
            },
            '' : {
              template: "<div ui-view></div>"
            }
          }
        },
        'landing' : {
          url: '/',
          templateUrl: 'app/landing/landing.html',
          controller: 'HM_LandingCtrl'
        },
        'hm.dashboard' : {
          url: '/dashboard',
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'HM_DashboardCtrl'
        },
        'hm.sellEquipment' :{
          url : '/equipments/sell',
          templateUrl : 'app/equipment-sell/equipment-sell.html',
          controller: 'HM_EquipmentSellCtrl'
        },
        'hm.invoices' : {
              url: '/invoices',
              templateUrl: 'app/invoices/invoices.html',
              controller: 'HM_InvoicesCtrl',
              openInModal : true
        },
        'hm.reserveEquipment' : {
          url: '/equipments/:id/reserve',
          templateUrl: 'app/equipment-reserve/equipment-reserve.html',
          controller: 'HM_EquipmentReserveCtrl',
          openInModal : true
        },
        'hm.search' : {
          url: '/search?query',
          templateUrl: 'app/search/search.html',
          controller: 'HM_SearchCtrl'
        },
        'hm.reserveEquipmentSuccess' : {
          url: '/equipments/:id/reserve-success',
          templateUrl: 'app/equipment-reserve-success/equipment.reserve-success.html',
          controller: 'HM_EquipmentReserveSuccessCtrl'
        },
        'hm.orderHistory' : {
          url: '/orders/history',
          templateUrl: 'app/order-history/order-history.html',
          controller: 'HM_OrderHistoryCtrl'
        },
        'hm.equipmentDetails' : {
          url: '/equipments/:id',
          templateUrl: 'app/equipment-detail/equipment-detail.html',
          controller: 'HM_EquipmentDetailCtrl'
        },
        'hm.manageJobSite' : {
          url: '/manage/jobsites',
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
          templateUrl: 'app/login/login.html',
          controller: 'HM_LoginCtrl'
        },
        'hmPrelogin.register' : {
          url: '/register',
          templateUrl: 'app/login/login.html',
          controller: 'HM_LoginCtrl'
        }

      },
      defaultRoute : '/'

  });
