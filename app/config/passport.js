const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
function init(passport){
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        //has a callback function done
        //Login
        //check if email exists
        const user = await User.findOne({ email: email});
        if(!user){
            return done(null,false, {message: 'User not found'});
        }
        bcrypt.compare(password, user.password).then( match => {
            if(match){
                return done(null, user, {message: 'Logged in successfully!'});
            }
            return done(null, false, {message: 'Wrong username or password'});
        }).catch(err => {
            return done(null, false, {message: 'Something went wrong!'});
        })
    }))
    passport.serializeUser((user, done) =>{  //if user logged in then we have to store something in session to make sure that the user is logged in or not
        done(null,user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id); //finding id in user table in database
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
    
}

module.exports = init;
