'use strict';
const mongoose=require("mongoose");
const teachersschema=new mongoose.Schema({
  email:{type:String,unique:true,index:true},
  name:String,
  DOB:Date,
  experience:Number,
  qualification:String,
  password:String,  
});
const teachersmodel=mongoose.model('teachers',teachersschema);
module.exports=teachersmodel;