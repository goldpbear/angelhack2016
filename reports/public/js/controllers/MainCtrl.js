// public/js/controllers/MainCtrl.js

angular.module('angelhack')
	   .controller('MainController', function($scope, $uibModal, geolocationService) {
	   		geolocationService.setCoords();

		   	var map;
			require(["esri/map"], function(Map) {
			  map = new Map("mapDiv", {
			    center: [-56.049, 38.485],
			    zoom: 3,
			    basemap: "streets"
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
	   	.controller('reportModalController', function($scope, $uibModalInstance, $http, geolocationService) {
	   		$scope.submission = {};

	   		var coords = geolocationService.getCoords();
	   		console.log(coords);

	   		var data = {
	   			"type": undefined,
	   			"description": undefined,
	   			"coordinates": [coords.latitude, coords.longitude]
	   		}

	   		$scope.ok = function (submission) {
	   			data.type = parseInt(submission.type);
	   			data.description = submission.description;

	   			console.log(data);
	   			$http({
	   				method: "POST",
	   				url: "/api/reports",
	   				data: data

	   			}).then(function successCallback(response) {
	   				console.log("success", response);
				  }, function errorCallback(response) {
				  	console.log("error", response);
				});

			    $uibModalInstance.close();
			};

			$scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
			};

	   	});