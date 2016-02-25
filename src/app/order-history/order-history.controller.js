'use strict';
angular.module("HM_OrderHistoryMD")
  .controller("HM_OrderHistoryCtrl",['$scope','HM_RestSV','HM_QuotaNReservationsCnst','HM_QuoteDetailsCnst', function($scope,RestSV,QuotaCnst, OrderCnst){



    _defineScope();
    _fetchOrders();

    $scope.fetchOrdeDetail = fetchOrdeDetail;


    function fetchOrdeDetail(order){
      if( !order.products || !order.products.length){
        order.fetchingDetails = true;
        RestSV
          .get(OrderCnst.details.url(),{
            order_id : order.Order_id
          })
          .then(function(response){
            if(response.data.result){
              order.products = response.data.result.Orders.Products;
              order.fetchingDetails = false;
            }
          });
      }
    }


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
