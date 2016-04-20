'use strict';
var express=require("express");
var app=express();
var routs=express.Router();
var bodyParser=require("body-parser");
var path=require("path");
var methodOverride=require("method-override");
var mongoose=require("mongoose");
var session = require('express-session');
app.use(session({resave: true, saveUninitialized: true, secret: 'thisisbigfilter', cookie: { maxAge: 60000 }}));


var envirment=process.env.NODE_ENV=process.env.NODE_ENV || 'config1';
var configr=require(__dirname+"/config/routes/"+ envirment);

console.log(configr);
mongoose.connect(configr.mongo.url,function(err){
	if(!err){
		console.log("Successfully connected");
	}else{
		console.log(err);

	}
});

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	// intercept OPTIONS method
	if ('OPTIONS' === req.method) {
		res.send(200);
	}
	else {
		next();
	}

};
app.use(allowCrossDomain);

	app.get("/hello",function(){
		console.log("Hello Sandip");
	})
	app.get('/', function(req, res) {
		res.redirect("http://localhost:63342/bigcomm/Html/login.html");
	});
	require('./routes')(app);


	app.listen(configr.server.port);
	console.log("Server start on this port"+configr.server.port);
