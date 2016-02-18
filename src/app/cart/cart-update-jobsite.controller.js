'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartUpdateJobSiteCtrl",['$scope','$timeout', 'HM_RestSV','HM_JobSitesCnst','uiGmapGoogleMapApi',function( $scope,$timeout,RestSV, AddJobSiteCnst,GoogleMapApi){


    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
      },_unWatchAddress;

    $scope.selectJobsite = selectJobsite;
    $scope.addJobSite = addJobSite;
    $scope.hackMapLoad = function(){
      $timeout(function(){
        $scope.showMap = true;
      },300)
    };

    $scope.tabs = {
      addNew : false
    };

    $scope.address = { jobsite: '', phone: ''};

    //$scope.deliveryStep = _.find($scope.cartData.steps, function(o) { return o.name == 'delivery'; });


    _initialize();

    function _initialize(){

      angular.extend($scope, {
        map: {
          center: {latitude: 41.850033, longitude: -87.6500523},
          zoom: 8,
          style: 'height:100px;',
          idkey: 'place_id'
        },
        searchbox: {
          options: {
            autocomplete:true
          },
          events: {
            place_changed: function (autocomplete){
              var place = autocomplete.getPlace();
              $scope.map.center.latitude =place.geometry.location.lat();
              $scope.map.center.longitude =place.geometry.location.lng();
              fillInAddress(place);
            }
          }

        }
      });

      if(!$scope.userObj){
        $timeout(function(){
          $scope.showMap = true;
        },2000);
        _initializeJobsiteAddress();
        _unWatchAddress = $scope.$watch('address',function(){
          _setJobSiteAddress();
        }, true);


      }



    }


    function _initializeJobsiteAddress(){
      if($scope.cartData.steps.delivery.complete){

        $scope.address = {
          jobsite : $scope.cartData.delivery.selectedJobSite.Site_Name,
          route : $scope.cartData.delivery.selectedJobSite.Address1,
          locality: $scope.cartData.delivery.selectedJobSite.City,
          administrative_area_level_1 :  $scope.cartData.delivery.selectedJobSite.Prov,
          postal_code : $scope.cartData.delivery.selectedJobSite.Postal,
          phone : $scope.cartData.delivery.selectedJobSite.Phone
        };

      }
    }


    function _setJobSiteAddress(){
      var inValid =  !!_.findKey($scope.address, function(o) {
        return o  == "" || o == undefined;
      });
      if(inValid){
        $scope.cartData.delivery.selectedJobSite = {};
        console.log("$scope.cartData.delivery.selectedJobSite",$scope.cartData.delivery.selectedJobSite)
      }else{
        $scope.cartData.delivery.selectedJobSite = {
          Site_Name : $scope.address.jobsite,
          Address1 : $scope.address.route,
          City : $scope.address.locality,
          Prov : $scope.address.administrative_area_level_1,
          Postal : $scope.address.postal_code,
          Phone : $scope.address.phone
        };

      }
    }

    function selectJobsite(site){
      angular.merge($scope.cartData.delivery.selectedJobSite,site);
    }

    function fillInAddress(details) {
      var place = details;
      for (var i = 0; i < place.address_components.length; i++) {
        console.log(place.address_components[i])
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          $scope.address[addressType] = val;
        }
      }
    }

    function addJobSite(){
      $scope.$broadcast('Cart:Jobsite:Save:Start')
      RestSV
        .post( AddJobSiteCnst.add.url() ,{
          jobsite_name : $scope.address.jobsite,
          adddress1 : $scope.address.route,
          city : $scope.address.locality,
          state : $scope.address.administrative_area_level_1,
          zip : $scope.address.postal_code,
          phone : $scope.address.phone
        })
        .then(function(response){
          $scope.cartData.delivery.selectedJobSite = response.data.result.Jobsite_details;
          $scope.cartData.jobsites.unshift($scope.cartData.delivery.selectedJobSite);
          $scope.tabs.addNew= false;
        })
        .catch(function(response){
        })
        .finally(function(){
          $scope.$broadcast('Cart:Jobsite:Save:End')
        })
    }

  }]);
