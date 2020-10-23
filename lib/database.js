'use strict';
const mongoose=require('mongoose');
const key=require("../secret.js");
function connect(){
    mongoose.connect(key.mogoKey,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    });
    const connection=mongoose.connection;
    connection.on("error",function(err){
        console.log("server is down",err);
        throw err;
    })
    connection.on('open',function(){
        console.log("successfully connected");
    })
}
module.exports={
    connect: connect,
}