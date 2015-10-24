'use strict';
angular.module("HM_EquipmentReserveMD")
  .controller("HM_EquipmentReserveCtrl",['$scope','$modalInstance', function($scope,$modalInstance){



    $scope.$on('$stateChangeSuccess', function(){
      $modalInstance.close();
    });

  }]);
