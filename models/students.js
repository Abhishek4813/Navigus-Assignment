'use strict';
const mongoose=require("mongoose");
const studentsschema=new mongoose.Schema({
  email:{type:String,unique:true,index:true},
  name:String,
  DOB:Date,
  collage:String,
  branch:String,
  password:String,
  enrolled:[{
    courseid:String,
    marks:Number,
  }]  
});
const studentsmodel=mongoose.model('students',studentsschema);
module.exports=studentsmodel;