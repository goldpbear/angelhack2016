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

	   		$scope.tagline = "It's working";
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
	   	.controller('reportModalController', function($scope, $uibModalInstance) {
	   		$scope.ok = function () {
			    $uibModalInstance.close();
			};

			$scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
			};

	   	});