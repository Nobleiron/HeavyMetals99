angular.module("HM_SelectCustomerMD")
  .controller('HM_SelectCustomerCtrl', ['$scope','$filter','$uibModal','$state','HM_RestSV','HM_SelectCustomerCnst','toastr', function($scope, $filter, $uibModal,$state, RestSV,SelectCustomerCnst,toastr){


    var originalData = [];

    $scope.flags ={
      page : 1,
      cursor : 0,
      noOfRecords : SelectCustomerCnst.noOfRecords
    };

    _initialize();

    function _initialize(){
      _fetchPortalCustomers();
    }


    $scope.assignCustomer = assignCustomer;

    $scope.searchCustomer = searchCustomer;


    function searchCustomer(){
      if($scope.query){
        $scope.portalCustomerList = angular.copy($filter('filter')(originalData, $scope.query));
      }else{

        $scope.portalCustomerList = originalData;
      }
      $scope.flags.cursor = 0;
      $scope.flags.page = 1;
    }


    $scope.pageChange = function(){
        $scope.flags.cursor = $scope.flags.page * $scope.flags.noOfRecords;
    };


    function assignCustomer(customer) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/select-customer/assign-customer.html',
        controller: ['$scope', function (scope) {
          scope.customer = customer;


          scope.saveAssignedCustomer = function(customer){
            saveAssignedCustomer(customer, scope);
          }

        }]
      });


    }


    function saveAssignedCustomer(customer,scope){
      scope.$broadcast('Assign:Customer:Process:Start');
      RestSV.post(SelectCustomerCnst.assign.url(),{
        cust_no : customer.CustomerNO,
        cust_name : customer.CustomerName,
        email : customer.Email
      })
        .then(function(response){
          scope.$broadcast('Assign:Customer:Process:End');
          scope.$dismiss();
          $state.go('hm.dashboard.main');
        })
        .catch(function(error){
          scope.$broadcast('Assign:Customer:Process:End');
          scope.$dismiss();
          toastr.error('Failed to Assign Customers');
        });
    }

    function _fetchPortalCustomers(){
      $scope.portalCustomersPromise = RestSV.get(SelectCustomerCnst.list.url())
        .then(function(response){
          originalData = response.data.result.PortalCustomerList;
          $scope.portalCustomerList = angular.copy(originalData);

        })
        .catch(function(error){
          $scope.portalCustomerList = [];
          toastr.error('Failed to fetch Customers');
        })
    }

  }]);
