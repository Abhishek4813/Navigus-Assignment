const passport=require("passport");
const LocalStrategy = require('passport-local').Strategy;
const teachersmodel=require("../models/teachers");
const studentsmodel=require('../models/students');
const bcrypt=require("bcryptjs");
const util=require('util');
const compareAsync=util.promisify(bcrypt.compare);
passport.use(new LocalStrategy({
    usernameField: 'email',
},function(email,password,done){
let userobj;
teachersmodel.findOne({email:email})
.then(user=>{
    if(user==null){
        studentsmodel.findOne({email:email}).then(data=>{
        if(data==null)
            return false;
    userobj=data;
    return compareAsync(password,data.password);
        }).then(status=>{
            if(status)
                return done(null,userobj);
            return done(null,stauts);
        })
    }
    else
    compareAsync(password,user.password).then(status=>{
        if(status)
                return done(null,user);
            return done(null,stauts);
    });
})
.catch(err=>{
    done(err);
})  
}));

passport.serializeUser(function(user,done){
    return done(null,user._id);
});

passport.deserializeUser(function(id,done){
    return teachersmodel.findOne({_id:id})
    .then(user=>{
        if(user===null){
            studentsmodel.findOne({_id:id})
            .then(user=>done(null,user));
        }
        else
            done(null,user)})
    .catch(err=>done(err));
});