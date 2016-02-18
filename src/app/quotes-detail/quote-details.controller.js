'use strict';
angular.module("HM_QuoteDetailsMD")
  .controller("HM_QuoteDetailsCtrl",['$scope','HM_RestSV','$stateParams','HM_EquipmentReserveSuccessCnst', function($scope,RestSV,$stateParams,EquipmentReserveSuccessCnst){

    $scope.flags = {
      orderFetched : false
    };
    RestSV
      .get(EquipmentReserveSuccessCnst.details.url(),{
        category : 'rent',
        order_id : $stateParams.id
      })
      .then(function(response){
        if(response.data.result){
          $scope.order = response.data.result.Orders;
        }else{
          console.log("Err", response)
        }

        $scope.flags.orderFetched = true;
      })

  }]);



