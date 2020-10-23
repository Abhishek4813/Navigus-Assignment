'use strict';
const mongoose=require("mongoose");
const courseschema=new mongoose.Schema({  
    coursename:String,
    teachername:String,
    teacherid:String,
    level:String,
    quiz:[{
        question:String,
        option:[{type:String}],
        answer:[{type:Number}],
        point:Number
    }]

});
const coursemodel=mongoose.model('courses',courseschema);
module.exports=coursemodel;