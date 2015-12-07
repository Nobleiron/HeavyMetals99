'use strict';
angular.module("HM_ManageJobSitesMD")
  .controller('HM_AddJobSiteCtrl', ['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', function( $scope, $timeout, $log, $http, GoogleMapApi ){

    $scope.result1 = '';
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
    $scope.address = {};

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


    angular.extend($scope, {
      selected: {
        options: {
          visible:false

        },
        templateurl:'window.tpl.html',
        templateparameter: {}
      },
      map: {
        control: {},
        center: { latitude: 45, longitude: -73 },
        zoom: 8,
        dragging: false,
        bounds: {},
        markers: [],
        idkey: 'place_id',
      },
      searchbox: {
        template:'searchbox.tpl.html',
        options: {
          autocomplete:true,
        },
        events: {
          place_changed: function (autocomplete){

            var place = autocomplete.getPlace()
            fillInAddress(place);

            if (place.address_components) {

             var newMarkers = [];
              var bounds = new google.maps.LatLngBounds();

              var marker = {
                id:place.place_id,
                place_id: place.place_id,
                name: place.address_components[0].long_name,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
                options: {
                  visible:false
                },
                templateurl:'window.tpl.html',
                templateparameter: place
              };

              newMarkers.push(marker);

              bounds.extend(place.geometry.location);

              $scope.map.bounds = {
                northeast: {
                  latitude: bounds.getNorthEast().lat(),
                  longitude: bounds.getNorthEast().lng()
                },
                southwest: {
                  latitude: bounds.getSouthWest().lat(),
                  longitude: bounds.getSouthWest().lng()
                }
              }

              _.each(newMarkers, function(marker) {
                marker.closeClick = function() {
                  $scope.selected.options.visible = false;
                  marker.options.visble = false;
                  return $scope.$apply();
                };
                marker.onClicked = function() {
                  $scope.selected.options.visible = false;
                  $scope.selected = marker;
                  $scope.selected.options.visible = true;
                };
              });

              $scope.map.markers = newMarkers;
            } else {
              console.log("do something else with the search string: " + place.name);
            }
          }
        }


      }
    });
    //
    //$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    //
    //$scope.randomMarkers = [{ id : 34,latitude: 21, longitude: 78 }]
    //
    //$scope.result1 = '';
    //$scope.options1 = null;
    //$scope.details1 = '';
    //var componentForm = {
    //  street_number: 'short_name',
    //  route: 'long_name',
    //  locality: 'long_name',
    //  administrative_area_level_1: 'long_name',
    //  country: 'long_name',
    //  postal_code: 'short_name'
    //};
    //
    //$scope.address = {};
    //
    //
    //
    //function fillInAddress(details) {
    //  var place = details;
    //  for (var i = 0; i < place.address_components.length; i++) {
    //    console.log(place.address_components[i])
    //    var addressType = place.address_components[i].types[0];
    //    if (componentForm[addressType]) {
    //      var val = place.address_components[i][componentForm[addressType]];
    //      $scope.address[addressType] = val;
    //    }
    //  }
    //}
    //
    //$scope.$on("Address:Selected", function(e, details){
    //    fillInAddress(details);
    //});
    //
    //$scope.result2 = '';
    //$scope.options2 = {
    //  country: 'ca',
    //  types: '(cities)'
    //};    $scope.details2 = '';
    //
    //
    //
    //$scope.result3 = '';
    //$scope.options3 = {
    //  country: 'gb',
    //  types: 'establishment'
    //};
    //$scope.details3 = '';

  }]);
