const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You Must Be Signed In To View This Resource')
        res.redirect('/users/login')
    }
    next()
}

module.exports = isLoggedIn