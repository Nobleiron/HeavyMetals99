'use strict';
angular.module("HM_OrderHistoryMD")
  .controller("HM_OrderHistoryCtrl",['$scope','HM_RestSV','HM_QuotaNReservationsCnst', function($scope,RestSV,QuotaCnst){

    $scope.oneAtATime = true;

    $scope.orders = [{
      orderNo: 'ODR-123-456-7890',
      title : 'Gas-Powered Water Pump',
      RentedForDays : 45,
      totalAmount : 760,
      equipmentImageUrl : '',
      toggleOpened : false

    },{
      orderNo: 'ODR-123-456-7891',
      title : 'Gas-Powered Water Pump',
      RentedForDays : 36,
      totalAmount : 800,
      equipmentImageUrl : '',
      toggleOpened : false
    }];

    $scope.toggleAccordian = function(order){
      $scope.orders.forEach(function(d){
        if(d.orderNo != order.orderNo){
          d.toggleOpened = false;
        }});
      order.toggleOpened = !order.toggleOpened;

    };


    $scope.flags = {
      ordersFetched : false
    };
    RestSV
      .get(QuotaCnst.list.url(),{
        category : 'rent',
        order_type : 'R'
      })
      .then(function(response){
        if(response.data.result){
          $scope.orders = response.data.result.order_list;

          $scope.orders.forEach(function(order){
            order.toggleOpened = false;
          })
        }else{
          console.log("Err", response)
        }

        $scope.flags.ordersFetched = true;
      });


  }]);
