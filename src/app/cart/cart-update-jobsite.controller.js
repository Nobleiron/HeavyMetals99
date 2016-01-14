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
    };

    $scope.selectJobsite = selectJobsite;
    $scope.addJobSite = addJobSite;
    $scope.hackMapLoad = function(){
      $timeout(function(){
        $scope.showMap = true;
      },300)
    };

    $scope.address = { jobsite: '', phone: ''};



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


    }

    function selectJobsite(site){
      angular.merge($scope.cartData.selectedJobSite,site);
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
          $scope.cartData.jobsites = response.data.result.Jobsite_details;
          $scope.cartData.jobsites.forEach(function(j){
            j.SiteID == response.data.result.Jobsite_id && angular.merge($scope.cartData.selectedJobSite, j);
          })
        })
        .catch(function(response){
          debugger
        })
        .finally(function(){
        })
    }

  }]);
