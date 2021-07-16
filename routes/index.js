const express = require('express')

const router = express.Router()
const isLoggedIn = require('../middleware')


//Index Page
router.get('/', (req,res)=>{
    res.render('index')
})


//Dashboard
//Can be accessed only after signing in
router.get('/dashboard',isLoggedIn,(req,res)=>{
    res.render('dashboard')
})


module.exports = router