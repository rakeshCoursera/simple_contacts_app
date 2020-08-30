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
  scope: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/contacts'],
},
(async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken: ', accessToken);
    const resp = await findOrCreateUser(profile, accessToken);

    if (resp.statusCode === 200) {
      return done(null, profile);
    }
    return done(resp.message);
  } catch (err) {
    return done(err.message);
  }
})));
