'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartReviewCtrl",['$scope','localStorageService',function( $scope, localStorageService){

  $scope.$emit('Cart:Reviewed');



  }]);
