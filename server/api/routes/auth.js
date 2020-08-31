const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { appUrl, jwtKey } = require('../../config/config');

const router = express.Router();

// Example protected and unprotected routes

// passport.authenticate middleware is used here to authenticate the request
router.get('/google', passport.authenticate('google'));

// The middleware receives the data from Google and runs the function on Strategy config
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => {
    const {
      id, displayName, emails, photos,
    } = req.user;
    const token = jwt.sign(
      {
        userId: id,
        username: displayName,
        email: emails[0].value,
        image: photos[0].value,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
      },
      jwtKey,
    );
    // Successful authentication, redirect home.
    res.redirect(`${appUrl}?token=${token}`);
  });

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(`${appUrl}`);
});

module.exports = router;
