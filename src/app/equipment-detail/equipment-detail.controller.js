'use strict';
angular.module("HM_EquipmentDetailMD")
  .controller("HM_EquipmentDetailCtrl",['$scope', function($scope){


    $scope.equipment = {
      name : 'Electric Equipment Wide - 16\"',
      vendor : "Vendor Name",
      daily : {
        price : "199",
        discount: ""
      },
      weekly: {
        price : "1049",
        discount : ""
      },
      monthly : {
        price : "",
        discount : ""
      }
    }

  }]);
