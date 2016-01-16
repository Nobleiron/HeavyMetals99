'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartCtrl",['$scope','$state','toastr','localStorageService','HM_RestSV', 'HM_CartCnst','HM_JobSitesCnst', function( $scope,$state,toastr,localStorageService,RestSV,ShoppingCartCnst,JobSitesCnst ){


    $scope.cartData = localStorageService.get('cartData') || {
      summary : {
        productsQuantity :{}
      },
      delivery : {
        selectedJobSite : {},
      },
      duration : {deliveryPreference :null},
      payment : {paynow: false},
      review : {},
      steps : angular.copy(ShoppingCartCnst.steps)
    };

    var deliveryStep = _.find($scope.cartData.steps, function(o) { return o.name == 'delivery'; });
    var summaryStep = _.find($scope.cartData.steps, function(o) { return o.name == 'summary'; });
    var durationStep = _.find($scope.cartData.steps, function(o) { return o.name == 'duration'; });
    var reviewStep = _.find($scope.cartData.steps, function(o) { return o.name == 'review'; });


    $scope.deleteProductFromCart = deleteProductFromCart;


    _initialize();

    function _initialize(){
      _fetchCart();
      _fetchJobsites();

      $scope.$watch('cartData', function(cartData){
        validateStepsCompletion();
        localStorageService.set('cartData',cartData);
      }, true);

      $scope.$on('Cart:Reviewed', function(){
        if(summaryStep.complete && deliveryStep.complete && durationStep.complete){
          reviewStep.complete = true;
        }
      });
    }


    function validateStepsCompletion(){
      var cartData = $scope.cartData;
      if(!angular.equals(cartData.delivery.selectedJobSite, {})){
        deliveryStep.complete = true;
      } else{
        deliveryStep.complete = false;
      }

      if(!angular.equals(cartData.summary.productsQuantity, {})){
        summaryStep.complete = true;
      }else{
        summaryStep.complete = false;
      }

      if(cartData.duration.fromDt && cartData.duration.toDt && cartData.duration.deliveryPreference){
        durationStep.complete = true;
      }else{
        reviewStep.complete = false;
        durationStep.complete = false;
      }

    }

    function _fetchJobsites(){
      RestSV.get(JobSitesCnst.jobsites.url())
        .then(function(response){
          if(response.data.result){
            $scope.cartData.jobsites =  response.data.result.Jobsite_details;
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
            $scope.cart = response.data.result.Cart_Content;

            $scope.cart && $scope.cart.Product && $scope.cart.Product.forEach(function(product){
              if(!$scope.cartData.summary.productsQuantity[product.Product_id]){
                $scope.cartData.summary.productsQuantity[product.Product_id] = { qty: product.Product_quantity,isDirty: false}
              }
              $scope.cartData.duration.span= humanizeDuration(moment($scope.cartData.duration.toDt).diff(moment($scope.cartData.duration.fromDt)));
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
          $scope.cart = response.data.result.Cart_Content;

          toastr.info("Item removed from cart");
        })
        .finally(function(error){
          cartData.deleteInProgress = false;
        });
    }




  }]);
