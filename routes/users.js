const express = require('express')
const passport = require('passport')
const User = require("../models/users")
const router = express.Router()

//Render Login Form
router.get('/login',(req,res)=>{
    res.render('login')
})

//Render Register Form
router.get("/register",(req,res)=>{
    res.render('register')
})


//Register Logic
router.post('/register', async(req,res)=>{

    const {email,username,name,password} = req.body;
    try{
        const user = new User({email,name,username})//making an instance of User model
        const registeredUser = await User.register(user,password);//.register()comes from passport-local-momgoose.........this function saves the user in the database with specified fields from the User model instance and also hashed password and salt
        req.flash('success','You are now registered and can login')
        res.redirect('/users/login')
    }catch(e){//e here is the caught error
        if(e.message=== 'E11000 duplicate key error collection: login.users index: email_1 dup key: { email: "pandeyn156@gmail.com" }')
            e.message='Email Already Registered'
        req.flash('error',e.message)//e.message contains the error message
        res.redirect('/users/register')
    } 
})

//Login Logic
router.post('/login', passport.authenticate('local',{failureFlash: true, failureRedirect:'/users/login'}),(req,res)=>{
    req.flash('success','Welcome '+ req.user.name)
    res.redirect('/dashboard')
})


//Logout
router.get('/logout',(req,res)=>{
    req.logOut()
    req.flash('success','Logged Out')
    res.redirect('/');
})


module.exports = router