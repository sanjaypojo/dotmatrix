var fetchLocation = function (dashElement, mapData) {

  var updateStatus = function(alertObj) {
    var alertTable = "<table>";
    for (var key in alertObj) {
      if (alertObj[key]) {
        alertTable += "<tr><td>" + key + "</td><td>" + alertObj[key] + "</td></tr>";
      }
    }
    alertTable += "</table>";
    dashElement.innerHTML = alertTable;
  };

  var updateMap = function(latitude, longitude) {
    mapData.currentLocation = new google.maps.LatLng(latitude, longitude);
    mapData.map.setCenter(mapData.currentLocation);
    mapData.marker.setPosition(mapData.currentLocation);
    mapData.geocoder.geocode({'latLng': mapData.currentLocation}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          console.log(results[1].formatted_address);
        }
        else {
          console.log("Fail");
        }
      }
      else {
        console.log("Fail");
      }
    });
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
