'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDurationCtrl",['$scope','HM_RestSV','toastr','HM_CartCnst',function( $scope,RestSV,toastr,CartCnst){

    $scope.deliveryTimeChange = deliveryTimeChange;



    function deliveryTimeChange(date){
      console.log("$scope.cartData.duration.toDt",$scope.cartData.duration.toDt,"$scope.cartData.duration.fromDt",$scope.cartData.duration.fromDt)

      if(($scope.cartData.duration.toDt && $scope.cartData.duration.fromDt)){
        if(moment($scope.cartData.duration.toDt).isBefore(moment($scope.cartData.duration.fromDt))){
          $scope.cartData.duration[date] = null;
          toastr.clear();
          var msg;
          if(date == 'toDt'){
            msg = date == 'toDt' ? "Return date should be ahead of renting date" : "Renting date should be before the return date"
          }else{
            $scope.fromDtOpened = false;
            msg = "Renting date should be before the return date"
          }
          $scope.$broadcast('Date:Picker:Change','date');
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
            });
          $scope.cartData.duration.span= humanizeDuration(moment($scope.cartData.duration.toDt).diff(moment($scope.cartData.duration.fromDt)));
        }
      }
    }


  }]);
