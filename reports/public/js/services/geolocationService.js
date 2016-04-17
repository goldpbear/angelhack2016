angular.module("angelhack").factory("geolocationService", function($rootScope) {
	var coordinates = {};

    var getC = function () {
        return coordinates;
    };

    var setC = function() {
        if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      coordinates = position.coords;
		      $rootScope.$broadcast("coordsRetrieved", coordinates);
		    });
		}
    };

    return {
        getCoords: getC,
        setCoords: setC
    };
});