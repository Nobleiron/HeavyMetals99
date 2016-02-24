'use strict';
angular.module("HM_OrderHistoryMD")
  .controller("HM_OrderHistoryCtrl",['$scope','HM_RestSV','HM_QuotaNReservationsCnst', function($scope,RestSV,QuotaCnst){



    _defineScope();
    _fetchOrders();

    $scope.toggleAccordian = function(order){
      $scope.orders.forEach(function(d){
        if(d.orderNo != order.orderNo){
          d.toggleOpened = false;
        }});
      order.toggleOpened = !order.toggleOpened;

    };



    function _fetchOrders(){
      $scope.ordersPromise = RestSV
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
            $scope.flags.hasData = false;
            console.log("Err", response)
          }

          $scope.flags.ordersFetched = true;
        });
    }

    function _defineScope(){
      $scope.flags = {
        hasData : true
      };
      $scope.oneAtATime = true;
    }





  }]);
