// public/js/controllers/MainCtrl.js

angular.module('angelhack')
	   .controller('MainController', function($scope, $uibModal) {

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
	   	.controller('reportModalController', function($scope, $uibModalInstance, $http) {

	   		var dummyData = {
	   			"type": 4,
	   			"description": "Stolen laptop",
	   			"coordinates": [23.4, -23.4]
	   		};

	   		$scope.ok = function () {
	   			console.log("click ok");
	   			$http({
	   				method: "POST",
	   				url: "https://gangel.herokuapp.com/api/reports",
	   				data: dummyData

	   			}).then(function successCallback(response) {
	   				console.log("success", response);
				    // this callback will be called asynchronously
				    // when the response is available
				  }, function errorCallback(response) {
				  	console.log("error", response);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});

			    $uibModalInstance.close();
			};

			$scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
			};

	   	});