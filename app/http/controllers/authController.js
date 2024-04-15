const passport = require('passport');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
function authController(){
    return {
        login(req,res) {
            res.render('login');
        },
        postLogin(req,res,next){
            //passport.authenticate on calling return a function
            passport.authenticate('local', (err,user,info) =>{
                //info will give successful or error messages we sent in passport.js
                //here we are defining the done method we used earlier
                if(err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                if(!user){
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (err) => {
                    if(err){
                        req.flash('error', info.message);
                        return next(err);
                    }
                    return res.redirect('/main_menu');
                })
            })(req,res,next)
        },

        register(req,res) {
            res.render('register');
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            // Validate request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register'); // Important to send response otherwise page won't load
            }
        
            try {
                // Check if email already exists
                const doesExist = await User.exists({ email: email });
                if (doesExist) {
                    req.flash('error', 'Email already taken');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
        
                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);
        
                // Create a user in the database
                const user = new User({
                    name: name,
                    email: email,
                    password: hashedPassword,
                });
        
                await user.save();
                // Login automatically after registering, or redirect as needed
                //return res.redirect('/main_menu');
                return res.redirect('/login');
            } catch (err) {
                console.error(err);
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            }
        },
        logout(req,res){
            req.logout(function(err){
                if (err) { 
                    return next(err); 
                }
                req.session.destroy(function(err){
                    if (err) {
                        console.log("Error : Failed to destroy the session during logout.", err);
                    }
                    res.redirect('/login'); // Redirect to the login page after logout
                });
            });
        }
    }
}
module.exports = authController;