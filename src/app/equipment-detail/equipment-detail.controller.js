'use strict';
angular.module("HM_EquipmentDetailMD")
  .controller("HM_EquipmentDetailCtrl",['$scope','$stateParams',"HM_RestSV","HM_EquipmentDetailCnst", function($scope, $stateParams,RestSV, EquipmentDetailCnst){


    console.log($stateParams);



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