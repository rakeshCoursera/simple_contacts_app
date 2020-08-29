// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      message: 'Could not verify your login',
    });
  }
};

module.exports = {
  isLoggedIn,
};
