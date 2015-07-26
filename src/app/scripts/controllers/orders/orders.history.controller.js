'use strict';
angular.module("HM_OrdersMD")
  .controller("HM_OrderHistoryCtrl",['$scope', function($scope){


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


  }]);
