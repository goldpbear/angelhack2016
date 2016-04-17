// public/js/controllers/MainCtrl.js

angular.module('angelhack')
	   .controller('MainController', function($rootScope, $scope, $uibModal, geolocationService) {
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
					  	$rootScope.longitude = map.extent.getCenter().getLongitude();
					});
				});
			});

	   		$scope.reportCrimeMsg = "Report a crime";

	   		// controls for modal dialog
	   		$scope.open = function () {
			    var modalInstance = $uibModal.open({
			      animation: $scope.animationsEnabled,
			      templateUrl: 'views/reportModal.html',
			      controller: 'reportModalController',
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    });
			};
		})
	   	.controller('reportModalController', function($rootScope, $scope, $uibModalInstance, $http, geolocationService, $window) {
	   		$scope.submission = {};

	   		var data = {
	   			"type": 0,
	   			"description": "no response",
	   			"latitude": $rootScope.latitude,
	   			"longitude": $rootScope.longitude
	   			//"coordinates": [$rootScope.longitude, $rootScope.latitude]
	   		}

	   		$scope.ok = function (submission) {
	   			data.type = parseInt(submission.type) || 0;
	   			data.description = submission.description;

	   			$http({
	   				method: "POST",
	   				url: "/api/reports",
	   				data: data

	   			}).then(function successCallback(response) {
	   				console.log("success", response);
	   				$window.location.href = "/overview";
				  }, function errorCallback(response) {
				  	console.log("error", response);
				});

			    $uibModalInstance.close();
			};

			$scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
			};

	   	});