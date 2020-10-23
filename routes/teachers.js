const express = require('express');
const teachersmodel=require('../models/teachers');
const studentmodel=require("../models/students");
const coursemodel=require("../models/course");
const router = express.Router();
const bcrypt=require("bcryptjs");

router.post('/signup',function(req,res){
    const {name,email,DOB,experience,qualification,password,Repassword}=req.body;
    if(password!==Repassword)
        return res.render('Signup',{msg:"RE-ENTERED password is not same..."});
    studentmodel.findOne({email:email})
    .then(data=>{
        if(data)
            return res.render("Login",{msg:"Email Already Exist..."});
    bcrypt.hash(password,8,function(err,hashedpassword){
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
})

router.get('/add/course',function(req,res){
    if(req.user && req.user.experience){
        return res.render("addcourse");
    }
    return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

router.post('/add/course',function(req,res,next){
    if(req.user &&req.user.experience){
    const {course,level}=req.body;
    var newcourse=new coursemodel({
        coursename:course,
        teachername:req.user.name,
        teacherid:req.user._id,
        level:level,
    })
    newcourse.save()
    .then(succ=>{
        res.redirect('/');
    })
    .catch(err=>{
        res.render("error");
    })
    return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

router.get("/course/delete/:id",function(req,res){
    if(req.user && req.user.experience){
    const id=req.params.id;
    coursemodel.deleteOne({_id:id})
    .then(succ=>{
        res.redirect("/");
    })
    .catch(err=>{
        res.redirect("error");
    })
    return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

router.get("/course/edit/:id",function(req,res){
    if(req.user && req.user.experience){
        const id=req.params.id;
        coursemodel.findOne({_id:id})
        .then(succ=>{
            res.render("editcourse",{course:succ});
        })
        .catch(err=>{
            res.render("error");
        })
        return;
    }
    return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});

})

router.post("/add/question/:id",function(req,res){
if(req.user && req.user.experience){
    const _id=req.params.id;
    const question=req.body.question;
    const option=req.body.option;
    const answer=req.body.answer;
    const id=req.body.id;
    const point=req.body.point;
coursemodel.updateOne({_id:_id},{
    $push:{
        quiz:{
            question:question,
            option:option,
            answer:answer,
            point:Number(point),
        }
    }
}).then(succ=>{
    res.redirect("/teachers/course/edit/"+_id);
})
.catch(err=>{
    res.render("error");
})
return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});    
})

router.get("/question/delete/:cid/:qid",function(req,res){
    if(req.user && req.user.experience){
    const cid=req.params.cid;
    const qid=req.params.qid;
    coursemodel.updateOne({_id:cid},{
        $pull:{
            quiz:{_id:qid}
        }
    })
    .then(succ=>{
        res.redirect("/teachers/course/edit/"+cid);
    })
    .catch(err=>{
        res.render("error");
    })
    return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

router.get("/question/edit/:cid/:qid",function(req,res){
    if(req.user && req.user.experience){
    const cid=req.params.cid;
    const qid=req.params.qid;
    coursemodel.findOne({_id:cid},{quiz:{$elemMatch:{_id:qid}}})
    .then(succ=>{
        res.render("editquiz",{course:succ});
    })
    .catch(err=>{
        res.render("error");
    })
    return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

router.post("/update/question",function(req,res){
    if(req.user && req.user.experience){
    const {courseid,quizid,question,option,answer,point}=req.body;
    coursemodel.updateOne({_id:courseid,"quiz._id":quizid},{
        $set:{
            "quiz.$.question":question,
            "quiz.$.option":option,
            "quiz.$.answer":answer,
            "quiz.$.point":Number(point),
            }
    })
    .then(succ=>{
        res.redirect("/teachers/course/edit/"+courseid);
    })
    .catch(err=>{
        res.render("error");
    })
    return;
}
return res.render("unauthorize",{msg:"STATUS :401 UNAUTHORIZE ACCESS :("});
})

module.exports = router;