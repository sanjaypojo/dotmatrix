var fetchLocation = function (dashElement, mapData) {

  var updateStatus = function(alertText) {
    dashElement.innerHTML = alertText;
  };

  var updateMap = function(latitude, longitude) {
    mapData.currentLocation = new google.maps.LatLng(latitude, longitude);
    mapData.map.setCenter(mapData.currentLocation);
    mapData.marker.setPosition(mapData.currentLocation);
  };

  var success = function(location) {
    console.log("Success");
    updateStatus(JSON.stringify(location.coords));
    updateMap(location.coords.latitude, location.coords.longitude);
  };

  var failure = function(err) {
    console.log("Failure");
    updateStatus(JSON.stringify(err));
  };

  if (navigator.geolocation) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(success, failure, {});
  }
  else {
    console.log("geolocation not available");
  }
};
