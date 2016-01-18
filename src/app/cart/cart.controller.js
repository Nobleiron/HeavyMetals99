'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartCtrl",['$scope','$state','toastr','localStorageService','HM_RestSV', 'HM_CartCnst','HM_JobSitesCnst', function( $scope,$state,toastr,localStorageService,RestSV,ShoppingCartCnst,JobSitesCnst ){


    $scope.cartData = localStorageService.get('cartData') || {
      cartVersion : ShoppingCartCnst.cartVersion,//Hack Need a better way here
      summary : {
        productsQuantity :{}
      },
      delivery : {
        selectedJobSite : {}
      },
      duration : {deliveryPreference :null},
      payment : {paynow: false},
      review : {},
      steps : angular.copy(ShoppingCartCnst.steps),
      jobsites : []
    };

    var steps = $scope.cartData.steps;


    $scope.deleteProductFromCart = deleteProductFromCart;

    $scope.jobsiteContactInfoEmpty = jobsiteContactInfoEmpty;

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
      if(!angular.equals(cartData.delivery.selectedJobSite, {})){
        steps.delivery.complete = true;
      } else{
        steps.delivery.complete = false;
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
            $scope.cart = response.data.result.Cart_Content;

            $scope.cart && $scope.cart.Product && $scope.cart.Product.forEach(function(product){
              if(!$scope.cartData.summary.productsQuantity[product.Product_id]){
                $scope.cartData.summary.productsQuantity[product.Product_id] = { qty: product.Product_quantity,isDirty: false}
              }
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
          $scope.cart = response.data.result.Cart_Content;

          toastr.info("Item removed from cart");
        })
        .finally(function(error){
          cartData.deleteInProgress = false;
        });
    }


    function jobsiteContactInfoEmpty(){
      if(!$scope.cartData.delivery.ContactInfo) return false;
      if($scope.cartData.delivery.ContactInfo){
        var x = _.valuesIn($scope.cartData.delivery.ContactInfo).filter(function(y){
          return y != ''
        });

        return !!x.length;
      }
      return false;

    }



  }]);
