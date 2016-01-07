'use strict';
angular.module("HM_EquipmentDetailMD")
  .controller("HM_EquipmentDetailCtrl",['$scope','$stateParams',"HM_RestSV","HM_EquipmentDetailCnst", function($scope, $stateParams,RestSV, EquipmentDetailCnst){


    $scope.addToOrRemoveFromWishList = addToOrRemoveFromWishList;

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
          .delete( EquipmentDetailCnst.addToOrRemoveFromWishList.url(),{
            data : jQuery.param({product_id: product.Product_Id}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .success(function(response){
            product.Is_in_catelog = false;
            $scope.catelog = false;
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
          })
          .finally(function(){
           $scope.$broadcast('Add:Wishlist:Process:End',product.Product_Id)
          });
      }
    }



  }]);
