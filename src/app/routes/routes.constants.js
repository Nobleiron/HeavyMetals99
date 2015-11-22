'use strict';
angular.module("HM_RoutesMD")
  .constant('HM_RoutesCnst', {

      routes : {
        'hmPrelogin' : {
          abstract : true,
          views : {
            navbar : {
              templateUrl: 'app/prelogin-header/prelogin-header.html',
              controller: 'HM_PreloginHeaderCtrl'
            },
            footer : {
              templateUrl : 'app/prelogin-footer/footer.html'
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
              templateUrl: 'app/header/header.html',
              controller: 'HM_HeaderCtrl'
            },
            footer : {
              templateUrl : 'app/footer/footer.html'
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
              controller: 'HM_InvoicesCtrl'
        },
        'hm.reserveEquipment' : {
          url: '/equipments/:id/reserve',
          templateUrl: 'app/equipment-reserve/equipment-reserve.html',
          controller: 'HM_EquipmentReserveCtrl',
          openInModal : true
        },
        'hm.search' : {
          url: '/search?query&viewType',
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
          templateUrl: 'app/manage-jobsites/manage-jobsites.html',
          controller: 'HM_ManageJobSitesCtrl'
        },
        'hm.requests' : {
          url: '/requests',
          templateUrl: 'app/views/requests/requests.html',
          controller: 'HM_RequestsCtrl'
        },
        'hm.help': {
          url: '/help',
          templateUrl: 'app/help/help.html',
          openInModal: true
        },
        'hmPrelogin.login' : {
          url: '/login',
          templateUrl: 'app/login/login.html',
          controller: 'HM_LoginCtrl'
        },
        'hmPrelogin.forgotPassword' : {
          url: '/forgot-password',
          templateUrl: 'app/forgot-password/forgot-password.html',
          controller: 'HM_ForgotPasswordCtrl'
        },
        'hmPrelogin.register' : {
          url: '/register',
          templateUrl: 'app/login/login.html',
          controller: 'HM_LoginCtrl'
        },
        'hmPrelogin.activateUser' : {
          url: '/user/activate?auth_code&email',
          templateUrl: 'app/activate-user/activate-user.html',
          controller: 'HM_ActivateUserCtrl'
        },
        'hmPrelogin.logout' : {
          url: '/logout',
          templateUrl : 'app/logout/logout.html',
          controller: 'HM_LogoutCtrl'
        },
        'hmPrelogin.requestCallback' : {
          url : '/request-callback',
          templateUrl : 'app/request-callback/request-callback.html',
          controller : 'HM_RequestCallBackCtrl',
          openInModal : true
        },
        'hmPrelogin.termsAndConditions' : {
          url : '/terms-n-conditions',
          templateUrl : 'app/terms-and-conditions/terms-and-conditions.html',
          controller : 'HM_TermsAndConditionsCtrl',
          openInModal : true
        }

      },
      defaultRoute : '/'

  });
