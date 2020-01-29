const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose= require('mongoose');

const User = mongoose.model('user');
passport.serializeUser((user,done) => {
  done(null,user.id);
});
passport.deserializeUser((id,done) => {
  User.findByID(id).then(user => {
    done(null,user);
  });
});

passport.initialize()

passport.use(
  new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },
    (accessToken, refreshToken, profile,done) => {
      User.findOne({googleID: profile.id})
        .then((existinguser) => {
          if (existinguser) {
            done(null,existinguser);
          } else {
            new User ({googleID: profile.id})
              .save()
              .then(user => done(null,user))
          }
        });
    }
  )
);