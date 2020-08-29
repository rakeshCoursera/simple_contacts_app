const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleId: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
  },
});

module.exports = {
  User: mongoose.model('Users', userSchema),
};
