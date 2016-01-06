'use strict';
angular.module("HM_EquipmentReserveMD")
  .controller("HM_EquipmentReserveCtrl",['$rootScope','$scope','$modalInstance','toastr','HM_RestSV','HM_EquipmentReserveCnst', function($rootScope, $scope, $modalInstance,toastr, RestSV, EquipmentReserveCnst ){


      //$scope.valuationDate = new Date();
      //$scope.valuationDatePickerIsOpen = false;
      //
      //$scope.valuationDatePickerOpen = function () {
      //
      //    $scope.valuationDatePickerIsOpen = true;
      //};

    $scope.quantity = 1;

    $scope.equipmentReserve = equipmentReserve;

    _initialize();

    function _initialize(){
      RestSV.get(EquipmentReserveCnst.details.url(),{product_id : $scope.modalParams.id})
      .then(function(response){
        $scope.product = response.data.result.ProductDetails
      })
      .catch(function(error){
      })
    }

    function equipmentReserve(){
      $scope.$broadcast('Equipment:Reserve:Process:Start');
      RestSV.post(EquipmentReserveCnst.addToCart.url(),{proid : $scope.product.Product_Id, qty : $scope.quantity})
        .then(function(response){
          $rootScope.$broadcast("Cart:Updated", response.data.result.Cart_Quantity);
          toastr.success('Product Added to cart successfully.');
        })
        .catch(function(error){
          toastr.error('Failed to add product to cart.');
        })
        .finally(function(){
          $scope.$broadcast('Equipment:Reserve:Process:End');
          $scope.$dismiss()
        });
      
    }


  }]);
