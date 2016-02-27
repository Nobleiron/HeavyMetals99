'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartCtrl",['$rootScope','$scope','$state','toastr','localStorageService','HM_RestSV', 'HM_CartCnst','HM_JobSitesCnst', function( $rootScope,$scope,$state,toastr,localStorageService,RestSV,ShoppingCartCnst,JobSitesCnst ){




    $scope.cartData = localStorageService.get('cartData') || {
      cartVersion : ShoppingCartCnst.cartVersion,//Hack Need a better way here
      summary : {
        productsQuantity :{}
      },
      delivery : {
        selectedJobSite : {},
        contactInfo : {}
      },
      duration : {deliveryPreference :null},
      payment : {paynow: false},
      review : {},
      steps : angular.copy(ShoppingCartCnst.steps),
      jobsites : []
    };

    $scope.data =  {
      cart : null,
      card : {
        cc_name : "",
        cc_number: "",
        cc_cvv: "",
        cc_month : "",
        cc_year : "",
        expiry : ""
      }
    };

    var normalizeCartDataToSubmit = {
      is_pay : $scope.cartData.payment.paynow+''
    };

    var steps = $scope.cartData.steps;



    $scope.userObj = localStorageService.get("userObj");





    $scope.deleteProductFromCart = deleteProductFromCart;

    $scope.jobsiteContactInfoEmpty = jobsiteContactInfoEmpty;

    $scope.generateQuote = generateQuote;

    $scope.reserve = reserve;

    _initialize();

    function _initialize(){
      _fetchCart();
      _fetchJobsites();

      $scope.$watch('cartData', function(cartData){
        validateStepsCompletion();
        localStorageService.set('cartData',cartData);
      }, true);


      $scope.$on('Cart:Reviewed', function(){
        if(steps.summary.complete && steps.delivery.complete && steps.duration.complete){
          steps.review.complete = true;
        }
      });
      console.log($state.current.name)
    }


    function validateStepsCompletion(){
      var cartData = $scope.cartData;
      if($scope.userObj){
          steps.delivery.complete = !angular.equals(cartData.delivery.selectedJobSite, {})
      }else{
        var inValid =  !!_.findKey(cartData.delivery.contactInfo, function(o) {
          return o  == "" || o == undefined;
        }) || angular.equals(cartData.delivery.contactInfo, {});
        steps.delivery.complete = !angular.equals(cartData.delivery.selectedJobSite, {}) &&  !inValid
      }
      if(!angular.equals(cartData.summary.productsQuantity, {})){
        steps.summary.complete = true;
      }else{
        steps.summary.complete = false;
      }

      if(cartData.duration.fromDt && cartData.duration.toDt && cartData.duration.deliveryPreference){
        steps.duration.complete = true;
      }else{
        steps.review.complete = false;
        steps.duration.complete = false;
      }

    }

    function _fetchJobsites(){
      RestSV.get(JobSitesCnst.jobsites.url())
        .then(function(response){
          if(response.data.result){
            $scope.cartData.jobsites =  response.data.result.Jobsite_details;
            !angular.equals($scope.cartData.delivery.selectedJobSite, {}) && $scope.cartData.jobsites.forEach(function(j){
              j.selected = j.SiteID == $scope.cartData.delivery.selectedJobSite.SiteID ? 1 : 0;
            });
          }
        })
        .catch(function(){
        })
        .finally(function(){

        });
    }

    function _fetchCart(){
      $scope.cartFetchInProgress = true;

      RestSV.get(ShoppingCartCnst.details.url())
        .then(function(response){
          if(response.data.result){
            $scope.data.cart = response.data.result.Cart_Content;

            $scope.data.cart && $scope.data.cart.Product && $scope.data.cart.Product.forEach(function(product){
              $scope.cartData.summary.productsQuantity[product.Product_id] = $scope.cartData.summary.productsQuantity[product.Product_id] || {};
              angular.extend($scope.cartData.summary.productsQuantity[product.Product_id] ,{ qty: product.Product_quantity, originalQuantity: product.Product_quantity})

              $scope.cartData.duration.span= humanizeDuration(moment($scope.cartData.duration.toDt).diff(moment($scope.cartData.duration.fromDt)));
              steps.summary.complete = true;
            })
          }else{
            localStorageService.remove('cartData')
          }


        })
        .catch(function(error){
        })
        .finally(function(){
          $scope.cartFetchInProgress = false;
        });
    }

    function deleteProductFromCart(id,cartData){
      cartData.deleteInProgress = true;
      RestSV.delete(ShoppingCartCnst.delete.url(),{
        data : {proid: id}})
        .then(function(response){
          $scope.data.cart = response.data.result.Cart_Content;
          $rootScope.$broadcast("Cart:Updated", response.data.result.Cart_Quantity);

          toastr.info("Item removed from cart");
        })
        .finally(function(error){
          cartData.deleteInProgress = false;
        });
    }


    function jobsiteContactInfoEmpty(){
      if(!$scope.cartData.delivery.contactInfo) return false;
      if($scope.cartData.delivery.contactInfo){
        var x = _.valuesIn($scope.cartData.delivery.contactInfo).filter(function(y){
          return y != ''
        });

        return !!x.length;
      }
      return false;

    }


    function reserve(){
      $scope.$broadcast('Reserve:Process:Start');
      _normalizePaymentDetails();
      _normalizeJobSiteDetails();
      _normalizeContactDetails();
      normalizeCartDataToSubmit.delivery_status = 'R';
      _submitCart().then(function(){
        $scope.$broadcast('Reserve:Process:End');
        $rootScope.$broadcast("Cart:Updated", 0);
      });
    }


    function _normalizePaymentDetails(){
      if($scope.cartData.payment.paynow == 'true'){
        angular.extend( normalizeCartDataToSubmit, $scope.data.card );
        var expiry = normalizeCartDataToSubmit.expiry.split(" / ");
        normalizeCartDataToSubmit.cc_month = expiry[0];
        normalizeCartDataToSubmit.cc_year = expiry[1].slice(-2);
        normalizeCartDataToSubmit.address1 = 'xxx';
        normalizeCartDataToSubmit.city = 'xxx';
        normalizeCartDataToSubmit.state = 'xxx';
        normalizeCartDataToSubmit.zip = '123456';
        normalizeCartDataToSubmit.payment_method = "C"
      }else{
        normalizeCartDataToSubmit.payment_method = "ACH"
      }

    }


    function _normalizeContactDetails(){
      normalizeCartDataToSubmit.contact_name = $scope.cartData.delivery.contactInfo.firstName  || null;
      normalizeCartDataToSubmit.site_contact_name = $scope.cartData.delivery.contactInfo.firstName  || 'xxx';
      normalizeCartDataToSubmit.site_contact_phone = $scope.cartData.delivery.contactInfo.phone || '1234567890';
      normalizeCartDataToSubmit.contact_name  = normalizeCartDataToSubmit.contact_name || '';
      $scope.cartData.delivery.contactInfo.lastName && (normalizeCartDataToSubmit.contact_name = normalizeCartDataToSubmit.contact_name + ' ' + $scope.cartData.delivery.contactInfo.lastName);
      normalizeCartDataToSubmit.email = $scope.cartData.delivery.contactInfo.email || null;
      normalizeCartDataToSubmit.contact_phone = $scope.cartData.delivery.contactInfo.phone || null;
      normalizeCartDataToSubmit.purchase_order_number = $scope.cartData.delivery.contactInfo.purchaseOrder || '1234567890';
      normalizeCartDataToSubmit.purchase_order= $scope.cartData.delivery.contactInfo.purchaseOrder || '1234567890';
      normalizeCartDataToSubmit.delivery_note = $scope.cartData.delivery.contactInfo.deliveryNote || null;
    }


    function _normalizeJobSiteDetails(){
      normalizeCartDataToSubmit.jobsite_id = $scope.cartData.delivery.selectedJobSite.SiteID;
      normalizeCartDataToSubmit.is_delivery = ($scope.cartData.duration.deliveryPreference == 'self') + '';
    }

    function generateQuote(){
      $scope.$broadcast('Quote:Process:Start');
      _normalizeJobSiteDetails();
      _normalizeContactDetails();
       normalizeCartDataToSubmit.delivery_status = 'Q';
      _submitCart().then(function(){
        $scope.$broadcast('Quote:Process:End');
        $rootScope.$broadcast("Cart:Updated", 0);
      })
    }

    function _submitCart(){
    return RestSV.post(ShoppingCartCnst.cartSubmit.url(),normalizeCartDataToSubmit)
        .then(function(response){
          var orders = response.data.result.Orders || response.data.result.Order || response.data.result.Order_details.Orders;
          localStorageService.remove("cartData");
          if(normalizeCartDataToSubmit.delivery_status == 'R'){
            $state.go('hm.reserveEquipmentSuccess',{source: 'reservation',id: orders[0].Order_id});
          }else{
            if($scope.userObj){
              $state.go('hm.dashboard.quotesDetail',{id: orders[0].Order_id});
            }else{
              //localStorageService.set(('orders_' + orders[0].Order_id), orders[0]);
              $state.go('hm.guestQuotesDetail',{id: orders[0].Order_id});
            }
          }

        })
        .catch(function(error){
          toastr.error('Failed to Submit Cart');
        });
    }



  }]);
