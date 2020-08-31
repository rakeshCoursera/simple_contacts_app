const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const session = require('express-session');
const { mongoUser, mongoPass } = require('./config/config');
require('./api/passport-setup');

const authRoutes = require('./api/routes/auth');
const contactsRoutes = require('./api/routes/contacts');

const app = express();

// mongodb connection setup
mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0.6wnm9.mongodb.net/contacts?retryWrites=true&w=majority`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

mongoose.Promise = global.Promise;

// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Home routes which should handle requests
app.get('/', (req, res) => {
  res.json({
    message: 'API version 1.0.0',
  });
});

// routes
app.use('/auth', authRoutes);
app.use('/api/v1/contact', contactsRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
