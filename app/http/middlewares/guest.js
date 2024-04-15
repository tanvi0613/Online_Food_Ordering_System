function guest(req,res,next){
    //if user is logged in then they can't go to login or register page by typing the url
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

module.exports = guest;