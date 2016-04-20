var express=require("express");
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema =  new Schema({
	
	Email:{type: String, unique: true},
    Password:String,
    Mobile:String,
    ClientId:String,
    ClientAppSecret:String
});
module.exports=mongoose.model("user_msts",userSchema);
