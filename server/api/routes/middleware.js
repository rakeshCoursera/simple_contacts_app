const jwt = require('jsonwebtoken');
const config = require('../../config/config');

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwtKey);
      req.user = decoded;
      next();
    } else {
      res.status(401).json({
        message: 'Please provide the authorization token',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Could not verify your login',
    });
  }
};

module.exports = {
  isLoggedIn,
};
