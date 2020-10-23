const express = require('express');
const passport=require('passport');
const coursemodel=require('../models/course');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 if(req.isAuthenticated()){
    if(req.user.experience){
      coursemodel.find({teacherid:req.user._id})
      .then(data=>{
        res.render('teacherDash',{data:data});
      }
      )
      .catch(err=>{
        res.render("error");
      })
    }  
    else{
      coursemodel.find({})
      .then(data=>{
        res.render('studentDash',{data:data,user:req.user.enrolled});
      }
      )
      .catch(err=>{
        res.render("error");
      })
    }
  }
  else
    res.redirect('/login');
});


router.get('/login',function(req,res){
  res.render("Login",{});
})

router.get('/signup',function(req,res){
  res.render('Signup',{});
})

router.post('/login',passport.authenticate("local",{
  successRedirect:'/',
  failureRedirect:'/error'
}))
router.get('/error',function(req,res){
  res.render("Login",{msg:"Invalid Credentials"})
})

router.get("/logout",function(req,res){
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
