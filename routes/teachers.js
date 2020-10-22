const express = require('express');
const teachersmodel=require('../models/teachers');
const router = express.Router();
const bcrypt=require("bcryptjs");

router.post('/signup',function(req,res){
    const {name,email,DOB,experience,qualification,password,Repassword}=req.body;
    if(password!==Repassword)
        return res.render('Signup',{msg:"RE-ENTERED password is not same..."});
    bcrypt.hash(password,8,function(err,hashedpasssword){
        if(err)
        return render('error');
        teacher = new teachersmodel({
        email:email,
        name:name,
        DOB:DOB,
        experience:experience,
        qualification:qualification,
        password:hashedpassword,
    })
    teacher.save()
    .then((succ)=>{
        return res.render("Login",{msg:"Successfully created try to login...."});
    })
    .catch(err=>{
        if(err.code===11000)
            return res.render("Login",{msg:"Email Already Exist...."});
        return res.render("error")
    })
})
})

module.exports = router;