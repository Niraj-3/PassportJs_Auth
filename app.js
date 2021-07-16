const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const User = require("./models/users")
const ejsMate = require('ejs-mate')
const dbConfig = require('./config/dbconfig')

const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/users')

const app = express()

//connecting mongoose
mongoose.connect(dbConfig,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>{
    console.log("Database Conncected........")
}).catch((err)=>{
    console.log(err)
})


//ejs
app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))




//setting up session
const sessionConfig = {
    name: "mysession",
    secret: "thisisnotagoodsecret",
    resave:false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,//a security feature
        // secure: true,// this is made true when we are using https request...this says cookies are goona be used only when we are using https protocol
        expires: Date.now() + 1000*60*60*24*7,//cookie expires after a week from date.now()...date.now() gives current time/data  in millisecond...all the calculation done in millisecond
        maxAge:1000*60*60*24*7
    }
}

//session and flash
app.use(session(sessionConfig))
app.use(flash())


//passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//global variables
app.use((req,res,next)=>{
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')  
  next();
})

//Routes
app.use('/', indexRoutes)
app.use('/users',userRoutes)


//starting the local server
app.listen(3000,()=>{
    console.log("SERVER STARTED AT 3000!!!💻")
})