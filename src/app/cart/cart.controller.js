'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartCtrl",['$scope','HM_RestSV', 'HM_CartCnst','HM_JobSitesCnst', function( $scope,RestSV,ShoppingCartCnst,JobSitesCnst ){

    $scope.cartData = {};
    $scope.selectedJobSite = {};


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
          debugger
        })
        .finally(function(){

        })
    }

    function _fetchCart(){
      $scope.cartFetchInProgress = true;

      RestSV.get(ShoppingCartCnst.details.url())
        .then(function(response){
          $scope.cart = response.data.result.Cart_Content;
          $scope.cart && $scope.cart.Product && $scope.cart.Product.forEach(function(product){
            if(!$scope.cartData[product.Product_id]){
              $scope.cartData[product.Product_id] = { qty: product.Product_quantity}
            }
          })

        })
        .catch(function(error){
          debugger
        })
        .finally(function(){
          $scope.cartFetchInProgress = false;
        })
    }
  }]);
