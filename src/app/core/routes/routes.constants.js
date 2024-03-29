'use strict';
angular.module("HM_RoutesMD")
  .constant('HM_RoutesCnst', {

      routes : {
        'hmPrelogin' : {
          abstract : true,
          views : {
            navbar : {
              templateUrl: 'app/components/prelogin-header/prelogin-header.html',
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
              templateUrl: 'app/components/header/header.html',
              controller: 'HM_HeaderCtrl'
            },
            footer : {
              templateUrl : 'app/components/footer/footer.html'
            },
            '' : {
              template: "<div ui-view></div>"
            }
          }
        },
        'hm.dashboard' : {
          abstract : true,
          templateUrl : "app/dashboard/dashboard.html",
          controller: 'HM_DashboardCtrl'
        },
        'landing' : {
          url: '/',
          templateUrl: 'app/landing/landing.html',
          controller: 'HM_LandingCtrl'
        },
        'hm.dashboard.main' : {
          url: '/dashboard',
          controller: 'HM_DashboardMainCtrl',
          templateUrl: 'app/dashboard-main/dashboard-main.html'
        },
        'hm.sellEquipment' :{
          url : '/equipments/sell',
          templateUrl : 'app/equipment-sell/equipment-sell.html',
          controller: 'HM_EquipmentSellCtrl'
        },
        'hm.userProfile' :{
          url : '/user/profile',
          templateUrl : 'app/user-profile/user-profile.html',
          controller: 'HM_UserProfileCtrl'
        },
        'hm.changePassword' :{
          url : '/change/password',
          templateUrl : 'app/change-password/change-password.html'
        },
        'hm.dashboard.invoices' : {
          url: '/invoices',
          templateUrl: 'app/invoices/invoices.html',
          controller: 'HM_InvoicesCtrl'
        },
        'hm.portalAccess': {
          url: '/portal-access',
          templateUrl: 'app/portal-access/portal-access.html',
          controller: 'HM_PortalAccessCtrl'
        },
        'hm.reserveEquipment' : {
          url: '/equipments/:id/reserve',
          templateUrl: 'app/equipment-reserve/equipment-reserve.html',
          controller: 'HM_EquipmentReserveCtrl',
          openInModal : true
        },
        'hm.search' : {
          url : '?type',
          abstract : true,
          templateUrl: 'app/search/search.html',
          controller: 'HM_SearchCtrl'
        },
        'hm.search.results' : {
          url: '/search?query&view_type=grid&category_id&{:attributes}',
          templateUrl: 'app/search/results.html',
          controller: 'HM_SearchResultCtrl'
        },
        'hm.reserveEquipmentSuccess' : {
          url: '/{source:(?:quote|reservation)}/:id/success',
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
        'hm.dashboard.jobSites' : {
          url: '/manage/jobsites?listView',
          templateUrl: 'app/jobsites/jobsites.html',
          controller: 'HM_JobSitesCtrl'
        },
        'hm.dashboard.jobSites.addJobSite': {
          url: '/add-job',
          templateUrl: 'app/jobsites/add-jobsite.html',
          controller: 'HM_AddJobSiteCtrl',
          openInModal: true
        },
        'hm.dashboard.jobSites.editJobSite': {
          url: '/add-job',
          params : {data : null},
          templateUrl: 'app/jobsites/edit-jobsite.html',
          controller: 'HM_EditJobSiteCtrl',
          openInModal: true
        },
        'hm.dashboard.quotaNReservations' : {
          url: '/quotes',
          templateUrl: 'app/quota-n-reservations/quota-n-reservations.html',
          controller: 'HM_QuotaNReservationsCtrl'
        },
        'hm.dashboard.quotesDetail' : {
          url: '/quotes/:id',
          controller: 'HM_QuoteDetailsCtrl',
          templateUrl: 'app/quotes-detail/quotes-detail.html'
        },
        'hm.guestQuotesDetail' : {
          url: '/quotes/g/:id',
          controller: 'HM_QuoteDetailsCtrl',
          templateUrl: 'app/quotes-detail/guest-quote-details.html'
        },
        'hm.dashboard.myCatalogue' : {
          url: '/my-catalogue',
          templateUrl: 'app/my-catalogue/my-catalogue.html',
          controller: 'HM_MyCatalogueCtrl'
        },
        'hm.dashboard.makePayment' : {
          url: '/make-payment',
          templateUrl: 'app/make-payment/make-payment.html'
        },
        'hm.dashboard.requests' : {
          url: '/requests',
          controller : 'HM_RequestsCtrl',
          templateUrl: 'app/requests/requests.html'
        },
        'hm.dashboard.viewContracts' : {
          url: '/view-contracts?status',
          templateUrl: 'app/contracts/contracts.html',
          controller: 'HM_ContractsCtrl'
        },
        'hm.help': {
          url: '/help',
          templateUrl: 'app/help/help.html',
          openInModal: true
        },
        'hm.cart': {
          url: '/cart',
          templateUrl: 'app/cart/cart.html',
          controller: 'HM_CartCtrl'
        },
        'hm.cart.details': {
          url: '/summary',
          templateUrl: 'app/cart/cart-details.html',
          controller: 'HM_CartDetailsCtrl'
        },
        'hm.cart.updateAddress': {
          url: '/delivery-details',
          views : {
            "": {
              templateUrl:'app/cart/cart-update-jobsite.html',
              controller: 'HM_CartUpdateJobSiteCtrl'
            },
            "snapshot@hm.cart.updateAddress": {
              templateUrl: 'app/cart/cart-snapshot.html'
            }
          }

        },
        'hm.cart.cartDuration': {
          url: '/rental-period',
          views : {
            "": {
              templateUrl: 'app/cart/cart-duration.html',
              controller : 'HM_CartDurationCtrl'
            },
            "snapshot@hm.cart.cartDuration": {
              templateUrl: 'app/cart/cart-snapshot.html'
            }
          },
          resolve : {
            whoCares : ['HM_CartAccessRules','$state','$timeout',function(CartAccessRules,$state,$timeout){

              var canAccess = CartAccessRules.canAccess($state.next.name);
              if(!canAccess){
                $timeout(function() {
                  $state.go($state.prev.name || 'hm.cart.details');
                });
              }
            }]
          }

        },
        'hm.cart.payment': {
          url: '/payment',
          views : {
            "": {
              templateUrl: 'app/cart/cart-payment.html',
              controller : 'HM_CartPaymentCtrl'
            },
            "snapshot@hm.cart.payment": {
              templateUrl: 'app/cart/cart-snapshot.html'
            }
          },
          resolve : {
            whoCares : ['HM_CartAccessRules','$state','$timeout',function(CartAccessRules,$state,$timeout){
              var canAccess = CartAccessRules.canAccess($state.next.name);
              if(!canAccess){
                $timeout(function() {
                  $state.go($state.prev.name || 'hm.cart.details');
                });
              }
            }]
          }

        },
        'hm.cart.review': {
          url: '/review',
          views : {
            "": {
              controller: 'HM_CartReviewCtrl',
              templateUrl: 'app/cart/cart-review.html'
            }
          },
          resolve : {
            whoCares : ['HM_CartAccessRules','$state','$timeout',function(CartAccessRules,$state,$timeout){
              var canAccess = CartAccessRules.canAccess($state.next.name);
              if(!canAccess){
                $timeout(function() {
                  $state.go($state.prev.name || 'hm.cart.details');
                });
              }
            }]
          }

        },
        'hm.updateJobSite': {
          url: '/update-job-site',
          templateUrl: 'app/update-job-site/update-job-site.html',
          openInModal: true
        },
        'hm.faq': {
          url: '/FAQ',
          templateUrl: 'app/faq/faq.html',
          controller: 'HM_OrderHistoryCtrl'
        },
        'hm.contactUs': {
          url: '/contact-us',
          templateUrl: 'app/contact-us/contact-us.html'
        },
        'hm.pressReleases': {
          url: '/press-releases',
          templateUrl: 'app/press-releases/press-releases.html',
          controller : 'HM_PressReleasesCtrl'
        },
        'hm.annualMeeting': {
          url: '/annual-meeting',
          templateUrl: 'app/annual-meeting/annual-meeting.html'
        },
        'hm.financialReports': {
          url: '/financial-reports',
          templateUrl: 'app/financial-reports/financial-reports.html',
          controller: 'HM_FinancialReportsCtrl'
        },
        'hm.team': {
          url: '/team',
          templateUrl: 'app/team/team.html',
          controller: 'HM_TeamCtrl'
        },
        'hm.boardOfDirectors': {
          url: '/board-of-directors',
          templateUrl: 'app/board-of-directors/board-of-directors.html',
          controller: 'HM_BoardOfDirectorsCtrl'
        },
        'hm.dashboard.invoiceDetail': {
          url: '/invoice-detail',
          templateUrl: 'app/invoice-detail/invoice-detail.html'
        },
        'hm.getTheSoftware': {
          url: '/get-the-software',
          templateUrl: 'app/get-the-software/get-the-software.html'
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
          url: '/register?terms',
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
        },
        'hmPrelogin.termsDetails' : {
          url : '/terms/detail',
          templateUrl : 'app/terms-and-conditions/terms-and-conditions-detail.html'
        }

      },
      defaultRoute : function($injector){
        var localStorageService = $injector.get('localStorageService');
        var userObj = localStorageService.get("userObj");
        if(userObj){
          return '/search'
        }else{
          return '/'
        }

      }

  });
