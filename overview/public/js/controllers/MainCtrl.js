// public/js/controllers/MainCtrl.js

angular.module('angelhack')
	   .controller('MainController', function($rootScope, $scope, geolocationService, $http) {
	   		var map,
	   			fetchedData,
	   			dummyData = [
	   				{
	   					"createdAt": "2016-04-17T01:28:53.127Z",
	   					"description": "crime!",
	   					"id": 1,
	   					"type": 2,
	   					"updatedAt": "2016-04-17T01:28:53.127Z",
	   					"longitude": -122.35117989999998,
	   					"latitude": 47.649616099999996,
	   				},
	   				{
	   					"createdAt": "2016-04-17T01:55:53.127Z",
	   					"description": "even more crime!",
	   					"id": 2,
	   					"type": 3,
	   					"updatedAt": "2016-04-17T01:55:53.127Z",
	   					"longitude": -122.35117980000001,
	   					"latitude": 47.65558063610035,
	   				}
	   			];

	   		geolocationService.setCoords();
	   		
	   		// hide map while loading;
	   		$scope.showMap = false;

	   		$scope.returnBtnMsg = "";
		   	

		   	$http({
   				method: "GET",
   				url: "/api/reports"
   			}).then(function successCallback(response) {
   				fetchedData = response.data;
   				console.log("success", response);
			  }, function errorCallback(response) {
			  	console.log("error", response);
			});


			$scope.$on("coordsRetrieved", function(event, data) {
				$rootScope.latitude = data.latitude;
				$rootScope.longitude = data.longitude;

				require(["esri/map", 
						 "esri/symbols/SimpleMarkerSymbol", 
						 "esri/geometry/Point", 
						 "esri/Color", 
						 "esri/graphic"], 
						 function(Map, SimpleMarkerSymbol, Color, Graphic, Point) {
						  	map = new Map("mapDiv", {
						  		basemap: "streets",
							    center: [$rootScope.longitude, $rootScope.latitude],
							    zoom: 14,
							    basemap: "streets"
							});

						  	map.on("load", function() {
						  		// add points from lat/long returned from api
							  	fetchedData.forEach(function(data) {
							  		var pt = new esri.geometry.Point(data.longitude, data.latitude); 
							  		map.graphics.add(new esri.Graphic(  
							            esri.geometry.geographicToWebMercator(pt),
							            new esri.symbol.SimpleMarkerSymbol(),
							            { "description": data.description,
							              "createdAt": data.createdAt } 
							        ));
							  	});

							  	map.graphics.on("mouse-over", function(evt) {
							  		var graphicAttributes = evt.graphic.attributes;
							  		var content = "<b>Description of this crime: </b><i>" + graphicAttributes.description + "</i><br>" +
							  					  "<b>Time of crime: </b><i>" + new Date(graphicAttributes.createdAt) + "</i>";
							  		map.infoWindow.setTitle("Crime report");
  									map.infoWindow.setContent(content);
  									map.infoWindow.show(evt.screenPoint,map.getInfoWindowAnchor(evt.screenPoint));

							  	});
						  	});

							$scope.showMap = true;
							$scope.$apply();

						});
			});
		});