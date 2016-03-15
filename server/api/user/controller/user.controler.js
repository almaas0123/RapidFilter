var express=require('express');
var request = require("request");
var fs=require("fs");


var User =require('../model/user.model.js');
exports.insert=insert;
exports.login=login;

function insert(req,res){
	var postdata=req.body;
	var user=new User({
		Email:postdata.Email,
		Password:postdata.Password,
		Mobile:postdata.Mobile,
		ClientId:postdata.ClientId,
    	ClientAppSecret:postdata.ClientAppSecret,
		Admin:postdata.Admin
	});
	user.save(function(err,result){
		if(!err){
			res.status(500).json({
				status:'successfully Inserted',
				data:result
			});
		}else{
			res.status(201).send(err);
		}
	});

}


function login(req,res){

	var postdata=req.body;
	User.findOne({ Email:postdata.Email,Password:postdata.Password },function(err,result){
		if(!err){
			res.status(500).json({
				status:'success',
				data:result

			});
			console.log("here 1")
			var username = 'user1',
				password = 'faf7c4c4b43e0c8e501c826806b96dae55a3997e',
				url = 'https://' + username + ':' + password + '@store-vbsnww.mybigcommerce.com/api/v2/products.json';

			request({url: url}, function (error, response, body) {
				if (error)
				{
					console.log("error");
					console.log(error);
					//console.log(body)
				} else {

					fs.writeFile('index.xml',body,  function(err) {
						if (err) {

							return console.error(err);
						}
						console.log(body)
						console.log("Data written successfully!");
						;

					})
				}
			});

			console.log('login successfully');
		}else{
			res.status(201).send(err);

		}
	});

}
