'use strict';
angular.module("HM_JobSitesMD")
  .controller('HM_EditJobSiteCtrl', ['$rootScope','$scope' ,'$state', 'HM_RestSV','uiGmapGoogleMapApi','toastr','HM_JobSitesCnst', function($rootScope, $scope, $state, RestSV, GoogleMapApi ,toastr,JobSiteCnst){


    debugger
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    $scope.saveJobSite = saveJobSite;

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

      initJobSiteData($scope.modalParams.data);
    }

    function initJobSiteData(data){
      $scope.address  = {
        jobsite : data.Site_Name,
        route: data.Address1,
        locality : data.City,
        administrative_area_level_1 : data.Prov,
        postal_code : data.Postal,
        phone : data.Phone,
        jobsite_id : data.SiteID
      };
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



    function saveJobSite(){
      $scope.$broadcast('JobSite:Update:Process:Start');
      RestSV
        .put( JobSiteCnst.add.url() ,{
          jobsite_name : $scope.address.jobsite,
          jobsite_id : $scope.address.jobsite_id,
          adddress1 : $scope.address.route,
          city : $scope.address.locality,
          state : $scope.address.administrative_area_level_1,
          zip : $scope.address.postal_code,
          phone : $scope.address.phone
        })
        .then(function(response){
          $state.go('hm.dashboard.jobSites',{ page : $scope.modalParams.page},{reload : true})
          toastr.success("JobSite Address Update Successfully");

          $scope.$dismiss();
        })
        .catch(function(response){
          $scope.$dismiss();
        })
        .finally(function(){
          $scope.$broadcast('JobSite:Update:Process:Start')
        })
    }



  }]);
