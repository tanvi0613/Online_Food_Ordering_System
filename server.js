const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const PORT = process.env.PORT || 4500;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');

//Database connection
const url = 'mongodb://localhost:27017/food';
const connection = mongoose.connection;
mongoose.connect(url).then(() => {
    console.log('Database connected!');
    connection.once('open', () => {
      console.log('Mongoose connection opened!');
    });
  }).catch(err => {
    console.error('Connection error:', err.message);
  });

//Session store
let mongoStore = MongoStore.create({
    mongoUrl: url,
    collectionName: 'sessions'
})

//Session config (session works as a middleware)
app.use(session({
    secret: 'secretkey',
    resave: false,
    store: mongoStore, //to store sessions in database instead or memory
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24 } //defining cookie's lifetime for how long it will be valid
}));

//Passport config
const passportInit = require('./app/config/passport'); //calling exported function
passportInit(passport); //we need passport in passport.js so sending as parameter
app.use(passport.initialize());
app.use(passport.session()); //passport works using session

app.use(flash()); //using flash as middleware so use keyword
// Assets
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//global middleware
app.use((req,res,next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next(); //process request forward
})

// Set the directory for views
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
