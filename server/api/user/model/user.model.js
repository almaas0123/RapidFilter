var express=require("express");
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema =  new Schema({
	
	Email:String,
    Password:String,
    Mobile:String,
    ClientId:String,
    ClientAppSecret:String,
    Admin:Boolean 
});
module.exports=mongoose.model("user_msts",userSchema);
