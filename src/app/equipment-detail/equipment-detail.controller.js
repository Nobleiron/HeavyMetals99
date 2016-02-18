'use strict';
angular.module("HM_EquipmentDetailMD")
  .controller("HM_EquipmentDetailCtrl",['$scope','$stateParams','$timeout','toastr',"HM_RestSV","HM_EquipmentDetailCnst", function($scope, $stateParams,$timeout,toastr,RestSV, EquipmentDetailCnst){


    $scope.addToOrRemoveFromWishList = addToOrRemoveFromWishList;

    $scope.calculateDeliveryCharges = calculateDeliveryCharges;

    _initialize();

    function _initialize(){
      $scope.equipmentFetchInProgress = true;
      RestSV
        .get( EquipmentDetailCnst.details.url() ,{
          product_id : $stateParams.id
        })
        .then(function(response){
          $scope.equipment = response.data.result.ProductDetails;
        })
        .finally(function(){
          $scope.equipmentFetchInProgress = false;
        })

    }

    function addToOrRemoveFromWishList(product){
      $scope.$broadcast('Add:Wishlist:Process:Start', product.Product_Id);
      if(product.Is_in_catelog){
        RestSV
          .delete( EquipmentDetailCnst.addToOrRemoveFromWishList.url(),{ data : {product_id : product.Product_Id }})
          .success(function(response){
            product.Is_in_catelog = false;
            $scope.catelog = false;
            toastr.success("Product removed from catalogue")
          })
          .finally(function(){
           $scope.$broadcast('Add:Wishlist:Process:End',product.Product_Id)
          });
      }else{
        RestSV
          .post( EquipmentDetailCnst.addToOrRemoveFromWishList.url(),{ product_id : product.Product_Id })
          .success(function(response){
            product.Is_in_catelog = true;
            $scope.catelog = true;
            toastr.success("Product added to catalogue")
          })
          .finally(function(){
           $scope.$broadcast('Add:Wishlist:Process:End',product.Product_Id)
          });
      }
    }


    function calculateDeliveryCharges(){
      $scope.calculateDeliveryChargesInProgress = true;
      $timeout(function(){
        $scope.deliveryRateByZipcode = 90;
        $scope.calculateDeliveryChargesInProgress = false;
      },2000)

    }


  }]);
