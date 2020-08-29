const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

// Example protected and unprotected routes
router.get('/failed', (req, res) => res.send('You Failed to log in!'));
router.get('/success', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`));

// passport.authenticate middleware is used here to authenticate the request
router.get('/google', passport.authenticate('google'));

// The middleware receives the data from Google and runs the function on Strategy config
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/auth/success');
  });

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = router;
