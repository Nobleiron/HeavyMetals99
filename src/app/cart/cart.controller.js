'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartCtrl",['$scope','toastr','HM_RestSV', 'HM_CartCnst','HM_JobSitesCnst', function( $scope,toastr,RestSV,ShoppingCartCnst,JobSitesCnst ){

    $scope.cartData = {selectedJobSite : {},productsQuantity :{}};

    $scope.deleteProductFromCart = deleteProductFromCart;

    _initialize();

    function _initialize(){
      _fetchCart();
      _fetchJobsites();
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
          $scope.cart = response.data.result.Cart_Content;
          $scope.cart && $scope.cart.Product && $scope.cart.Product.forEach(function(product){
            if(!$scope.cartData.productsQuantity[product.Product_id]){
              $scope.cartData.productsQuantity[product.Product_id] = { qty: product.Product_quantity,isDirty: false}
            }
          })

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

    $scope.cardPlaceholders = {
      name: 'Your Full Name',
      number: 'xxxx xxxx xxxx xxxx',
      expiry: 'MM/YY',
      cvc: 'xxx'
    };

    $scope.cardMessages = {
      validDate: 'valid\nthru',
      monthYear: 'MM/YYYY',
    };

    $scope.cardOptions = {
      debug: false,
      formatting: true,
      container: '.addcard__previev'
    };

  }]);
