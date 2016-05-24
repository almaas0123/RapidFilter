'use strict';
var express=require("express");
var routes=express.Router();
var session = require('express-session');



var controllr = require("./controller/user.controler.js");

routes.post('/register',controllr.insert);
routes.post('/login',controllr.login);
routes.post('/forgot_pass', controllr.forgot);
routes.post('/reset',controllr.resetpass);
routes.get('/logout',controllr.logout);
//routes.get('/home',controllr.homepage);
routes.post('/getProduct',controllr.getProduct);
routes.post('/addProject',controllr.addProject);
routes.post('/getproductbyid',controllr.getproductbyid);
routes.get('/getprojectName',controllr.getProjectName);
routes.post('/facet',controllr.getFacet);
	
module.exports=routes;
