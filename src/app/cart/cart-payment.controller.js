'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartPaymentCtrl",['$scope',function( $scope){
    $scope.cardPlaceholders = {
      name: 'Your Full Name',
      number: 'xxxx xxxx xxxx xxxx',
      expiry: 'MM/YY',
      cvc: 'xxx'
    };

    $scope.cardMessages = {
      validDate: 'valid\nthru',
      monthYear: 'MM/YYYY',
    };

    $scope.cardOptions = {
      debug: false,
      formatting: true,
      container: '.addcard__previev'
    };

    $scope.clear = function() {
      $scope.data.card.cc_number ='';
      $scope.data.card.cc_name ='';
      $scope.data.card.expiry ='';
      $scope.data.card.cc_cvv ='';
    }


  }]);
