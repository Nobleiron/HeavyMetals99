'use strict';
angular.module("HM_EquipmentDetailMD")
  .controller("HM_EquipmentDetailCtrl",['$scope','$stateParams',"HM_RestSV","HM_EquipmentDetailCnst", function($scope, $stateParams,RestSV, EquipmentDetailCnst){


    $scope.addToWishList = addToWishList;

    _initialize();

    function _initialize(){
      RestSV
        .get( EquipmentDetailCnst.details.url() ,{
          product_id : $stateParams.id
        })
        .then(function(response){
          $scope.equipment = response.data.result.ProductDetails;
        })

    }

    function addToWishList(product){

      RestSV
        .post( SearchCnst.addToWishList.url(),{ product_id : product.Product_Id })
        .then(function(response){
          product.addedToWishlist = true;
        })
        .catch(function(){
        })
    }



  }]);
