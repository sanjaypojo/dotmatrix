var fetchLocation = function (dashElement) {
  var updateStatus = function(alertText) {
    dashElement.innerHTML = alertText;
  };

  var success = function(location) {
    console.log("Success");
    updateStatus(JSON.stringify(location.coords));
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
