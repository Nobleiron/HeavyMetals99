'use strict';
angular.module("HM_EquipmentReserveMD")
  .controller("HM_EquipmentReserveCtrl",['$scope','$modalInstance','modalParams','HM_RestSV','HM_EquipmentReserveCnst', function( $scope, $modalInstance, modalParams, RestSV, EquipmentReserveCnst ){




      $scope.valuationDate = new Date();
      $scope.valuationDatePickerIsOpen = false;

      $scope.valuationDatePickerOpen = function () {

          $scope.valuationDatePickerIsOpen = true;
      };

    $scope.equipmentReserve = equipmentReserve;

    _initialize();

    function _initialize(){
      RestSV.get(EquipmentReserveCnst.details.url(),{product_id : modalParams.id})
      .then(function(response){
        $scope.product = response.data.result.ProductDetails
      })
      .catch(function(error){
      })
    }

    function equipmentReserve(){

    }


  }]);
