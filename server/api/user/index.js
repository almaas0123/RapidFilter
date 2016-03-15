'use strict';
var express=require("express");
var routes=express.Router();


var controllr = require("./controller/user.controler.js");

routes.post('/register',controllr.insert);
routes.post('/login',controllr.login);
	
module.exports=routes;
