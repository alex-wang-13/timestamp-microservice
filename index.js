// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



// Handles empty query
app.get("/api", (req, res) => {
  var date = new Date();
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
});



// Handles non-empty query param
app.get("/api/:date", (req, res) => {
  const query = req.params.date;
  if (isNaN(Number(query))) {
    var date = new Date(query);
  } else {
    var date = new Date(Number(query));
  }

  if (isNaN(date)) {
    res.json({"error": "Invalid Date"});
  } else {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }
});