'use strict';
angular.module("HM_EquipmentReserveMD")
  .controller("HM_EquipmentReserveCtrl",['$scope','$modalInstance','HM_RestSV','HM_EquipmentReserveCnst', function( $scope, $modalInstance, RestSV, EquipmentReserveCnst ){




      $scope.valuationDate = new Date();
      $scope.valuationDatePickerIsOpen = false;

      $scope.valuationDatePickerOpen = function () {

          $scope.valuationDatePickerIsOpen = true;
      };

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

    }


  }]);
