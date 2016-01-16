'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartReviewCtrl",['$scope',function( $scope){

  $scope.$emit('Cart:Reviewed');


  }]);
