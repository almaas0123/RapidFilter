/**
 * Created by lakum on 29/4/16.
 */
var express=require("express");
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema =  new Schema({
    UserId:String,
    ProjectName:String,
    ProjectId:String,
    UserName:String,
    ApiToken:String,
    StoreHash:String
});
module.exports=mongoose.model("project_msts",userSchema);

