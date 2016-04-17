angular.module("angelhack").factory("geolocationService", function() {
	var coordinates = {};

    var getC = function () {
        return coordinates;
    };

    var setC = function() {
        if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      coordinates = position.coords;
		    });
		}
    };

    return {
        getCoords: getC,
        setCoords: setC
    };
});