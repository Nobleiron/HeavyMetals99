'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDurationCtrl",['$scope','toastr',function( $scope,toastr){

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
        $scope.cartData.duration.span= humanizeDuration(moment($scope.cartData.duration.toDt).diff(moment($scope.cartData.duration.fromDt)));
      }
    }


  }]);
