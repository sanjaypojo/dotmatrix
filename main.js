var fetchLocation = function (dashElement, mapData) {

  var updateStatus = function(alertObj) {
    var alertTable = "<table>";
    for (key in alertObj) {
      alertTable += "<tr><td>" + key + "</td><td>" + alertObj[key] + "</td></tr>";
    }
    alertTable += "</table>"
    dashElement.innerHTML = alertTable;
  };

  var updateMap = function(latitude, longitude) {
    mapData.currentLocation = new google.maps.LatLng(latitude, longitude);
    mapData.map.setCenter(mapData.currentLocation);
    mapData.marker.setPosition(mapData.currentLocation);
  };

  var success = function(location) {
    console.log("Success");
    updateStatus(location.coords);
    updateMap(location.coords.latitude, location.coords.longitude);
  };

  var failure = function(err) {
    console.log("Failure");
    updateStatus(err);
  };

  if (navigator.geolocation) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(success, failure, {});
  }
  else {
    console.log("geolocation not available");
  }
};
