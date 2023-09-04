Install necessary packages:
npm install passport passport-local passport-local-mongoose express-session


const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Add additional user data fields here
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
#Configure Passport.js for user authentication and sessions:
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require('express-session')({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
