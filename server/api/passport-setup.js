const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findOrCreateUser } = require('./controllers/user');
const { clientID, clientSecret, callbackURL } = require('../config/config');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID,
  clientSecret,
  callbackURL,
  scope: ['profile', 'email'],
},
((accessToken, refreshToken, profile, done) => {
  console.log('accessToken: ', accessToken);
  // console.log('refreshToken: ', refreshToken);
  // console.log('profile: ', profile);
  findOrCreateUser(profile, accessToken)
    .then(() => done(null, profile))
    .catch(err => done(err));
})));
