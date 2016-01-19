'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDurationCtrl",['$scope','HM_RestSV','toastr','HM_CartCnst',function( $scope,RestSV,toastr,CartCnst){

    $scope.deliveryTimeChange = deliveryTimeChange;



    function deliveryTimeChange(date){
      if(($scope.cartData.duration.toDt && $scope.cartData.duration.fromDt) && moment($scope.cartData.duration.toDt).isBefore(moment($scope.cartData.duration.fromDt))){
        $scope.cartData.duration[date] = null;
        toastr.clear();
        var msg;
        if(date == 'toDt'){
          $scope.toDtOpened = false;
          $scope.showPicker = 'date';
          msg = date == 'toDt' ? "Return date should be ahead of renting date" : "Renting date should be before the return date"
        }else{
          $scope.fromDtOpened = false;
          $scope.showPicker = 'date';
          msg = "Renting date should be before the return date"
        }
        toastr.error(msg);
      }else{
        RestSV.put(CartCnst.updateDuration.url(),{
          start_date: moment($scope.cartData.duration.fromDt).format('MM-DD-YYYY'),
          end_date : moment($scope.cartData.duration.toDt).format('MM-DD-YYYY')
        })
          .then(function(response){
            $scope.data.cart = response.data.result.Cart_Content;
          })
          .catch(function(){
            debugger
          })
          .finally(function(){
            debugger
          });
        $scope.cartData.duration.span= humanizeDuration(moment($scope.cartData.duration.toDt).diff(moment($scope.cartData.duration.fromDt)));
      }
    }


  }]);
