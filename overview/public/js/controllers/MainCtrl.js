// public/js/controllers/MainCtrl.js

angular.module('angelhack')
	   .controller('MainController', function($rootScope, $scope, geolocationService, $http) {
	   		var map,
	   			fetchedData,
	   			crimeTypes = {
	   				0: "No response",
	   				1: "Assault",
	   				2: "Robbery",
	   				3: "Vandalism"
	   			};

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
							              "createdAt": data.createdAt,
							              "type": data.type } 
							        ));
							  	});

							  	map.graphics.on("mouse-over", function(evt) {
							  		var graphicAttributes = evt.graphic.attributes;
							  		var content = "<b>Description of this crime: </b><i>" + graphicAttributes.description + "</i><br>" +
							  					  "<b>Type of crime: </b><i>" + crimeTypes[graphicAttributes.type] + "</i><br>" +
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