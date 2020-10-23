const express = require('express');
const studentmodel=require("../models/students");
const teachermodel=require('../models/teachers');
const coursemodel=require("../models/course");
const router = express.Router();
const bcrypt=require("bcryptjs");

router.post('/signup',function(req,res){
    const {name,email,DOB,collage,branch,password,Repassword}=req.body;
    if(password!==Repassword)
        return res.render('Signup',{msg:"RE-ENTERED password is not same..."});
    teachermodel.findOne({email:email})
    .then(data=>{
        if(data)
            return res.render("Login",{msg:"Email Already Exist...."});
    
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
})

router.get('/take/quiz/:id',function(req,res){
if(req.user && req.user.collage){
const id=req.params.id;
coursemodel.findOne({_id:id})
.then(data=>{
    res.render("takequiz",{course:data});
})
.catch(err=>{
    res.render("error");
})
return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

router.post("/quiz/submit/:id",function(req,res){
    if(req.user && req.user.collage){
    const id=req.params.id;
    coursemodel.findOne({_id:id})
    .then(data=>{
        var score=0;
        for(var i=0;i<data.quiz.length;i++){
            const qid=data.quiz[i]._id
            const ans=req.body[qid];
            var flag=true;
            for(var j=0;j<ans.length;j++){
                if(!(data.quiz[i].answer).includes(ans[j])){
                    flag=false;
                    break;
                }
            } 
            if(flag===true)
                score+=data.quiz[i].point;
        }
    studentmodel.updateOne({_id:req.user._id},{
        $push:{
            enrolled:{
                courseid:id,
                marks:score,
            }
        }
    }).then(succ=>{
        res.redirect("/");
    })
    })
    .catch(err=>{
        res.render("error");
    })
    return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

router.get("/get/user",function(req,res){
    if(req.user && req.user.collage){
        res.json(req.user.enrolled);
        return;
    }
    return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});  
})

module.exports = router;