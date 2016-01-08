'use strict';
angular.module("HM_ManageJobSitesMD")
  .controller('HM_AddJobSiteCtrl', ['$scope', '$timeout', 'uiGmapLogger', 'HM_RestSV','uiGmapGoogleMapApi','toastr','HM_AddJobSiteCnst', function( $scope, $timeout, $log, RestSV, GoogleMapApi ,toastr,AddJobSiteCnst){

    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    $scope.addJobSite = addJobSite;

    $scope.address = { jobsite: '', phone: ''};

    $scope.center = {latitude: 41.850033, longitude: -87.6500523};

    _initialize();

    function _initialize(){
      GoogleMapApi.then(function (maps) {
        setTimeout(function () {
          $scope.showMap = true;
          $scope.$apply();
        }, 100);
      });


      angular.extend($scope, {
        map: {
          center: $scope.center,
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
              $scope.center.latitude =place.geometry.location.lat();
              $scope.center.longitude =place.geometry.location.lng();
              fillInAddress(place);
            }
          }

        }
      });


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
          toastr.success("JobSite Added Successfully");
          $scope.$dismiss();
        })
        .catch(function(response){
          $scope.$dismiss();
        })
        .finally(function(){
          $scope.$broadcast('SignUp:Process:End');
        })
    }



  }]);
