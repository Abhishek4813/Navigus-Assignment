const express = require('express');
const studentmodel=require("../models/students");
const router = express.Router();
const bcrypt=require("bcryptjs");

router.post('/signup',function(req,res){
    const {name,email,DOB,collage,branch,password,Repassword}=req.body;
    if(password!==Repassword)
        return res.render('Signup',{msg:"RE-ENTERED password is not same..."});
    bcrypt.hash(password,8,function(err,hashedpassword){
        if(err)
        return render("error");
        student = new studentmodel({
        email:email,
        name:name,
        DOB:DOB,
        collage:collage,
        branch:branch,
        password:hashedpassword,
    })
    student.save()
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