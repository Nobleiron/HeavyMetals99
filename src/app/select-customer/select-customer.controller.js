angular.module("HM_SelectCustomerMD")
  .controller('HM_SelectCustomerCtrl', ['$scope','HM_RestSV','HM_SelectCustomerCnst','toastr', function($scope,RestSV,SelectCustomerCnst,toastr){

    _initialize();

    function _initialize(){
      _fetchPortalCustomers();
    }


    function _fetchPortalCustomers(){
      $scope.portalCustomersPromise = RestSV.get(SelectCustomerCnst.list.url())
        .then(function(response){
          $scope.portalCustomerList = response.data.result.PortalCustomerList;
        })
        .catch(function(error){
          $scope.portalCustomerList = [];
          toastr.error('Failed to fetch Customers');
        })
    }

  }]);
