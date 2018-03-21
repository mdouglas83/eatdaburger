var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

/* URL- and JSON-encoded HTTP requests & responses... */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Handlebars */
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

/* Routes */
var routes = require("./controllers/burgersController.js");
app.use("/", routes);
app.use(express.static('public'));

app.listen(port, function() {
	console.log("HTTP server is listening on port " + port);
});