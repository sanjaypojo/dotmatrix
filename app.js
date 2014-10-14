var connect = require("connect");
var quip = require("quip");
var serveStatic = require("serve-static");
var csv = require("json2csv");
var morgan = require("morgan");
var url = require("url");
var qs = require("querystring");
var fs = require("fs");


var port = process.env.PORT || 3000;
var app = connect();

var displayLogs = function(req, res, next) {
  csv = fs.readFileSync("dataStore.csv", "utf-8");
  res.ok(csv);
};

var displayPage = function(req, res, next) {
  res.redirect("/");
};

app
  .use(morgan('combined'))
  .use(quip)
  .use(serveStatic(__dirname + "/public/"))
  .use("/post-location", function(req, res, next) {
    var parsedUrl = url.parse(req.url);
	  req.query = qs.parse(parsedUrl.query);
    req.pathname = parsedUrl.pathname;
    var locationData = JSON.parse(req.query.data);
    var finalData = locationData.coords;
    finalData.timestamp = locationData.timestamp;
    console.log(finalData);
    csv({
        data: finalData,
        fields:["timestamp","latitude", "longitude", "accuracy", "altitude", "altitudeAccuracy", "speed", "heading"],
        hasCSVColumnTitle: false
      },
      function(err, csv) {
        if(err) {
          console.log(err);
          res.error(err);
        }
        fs.appendFile("dataStore.csv", csv, function(err){
          if(err){
            console.log(err);
            res.error(err);
          }
          else {
            res.ok("Successfully added");
          }
        });
    });
  })
  .use("/logs", displayLogs)
  .use(displayPage)
  .listen(port);
