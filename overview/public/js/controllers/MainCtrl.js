// public/js/controllers/MainCtrl.js

angular.module('angelhack')
	   .controller('MainController', function($rootScope, $scope, geolocationService) {
	   		geolocationService.setCoords();
	   		
	   		// hide map while loading;
	   		$scope.showMap = false;
		   	
		   	var map;

			$scope.$on("coordsRetrieved", function(event, data) {
				$rootScope.latitude = data.latitude;
				$rootScope.longitude = data.longitude;

				require(["esri/map"], function(Map) {
				  	map = new Map("mapDiv", {
				  		basemap: "streets",
					    center: [$rootScope.longitude, $rootScope.latitude],
					    zoom: 14,
					    basemap: "streets"
					});

					$scope.showMap = true;
					$scope.$apply();

				  	// update lat and long when user recenters the map
					map.on("pan-end", function() {
					  	$rootScope.latitude = map.extent.getCenter().getLatitude();
					  	$rootScope.longtiude = map.extent.getCenter().getLongitude();
					  	//map.graphics.add(new esri.geometry.Point($rootScope.longitude, $rootScope.latitude));
					});
				});
			});
		});