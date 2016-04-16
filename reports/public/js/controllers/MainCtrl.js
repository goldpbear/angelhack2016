// public/js/controllers/MainCtrl.js

angular.module('angelhack')
	   .controller('MainController', function($scope) {

		   	var map;
			require(["esri/map"], function(Map) {
			  map = new Map("mapDiv", {
			    center: [-56.049, 38.485],
			    zoom: 3,
			    basemap: "streets"
			  });
			});

	   		$scope.tagline = "It's working"; 

});