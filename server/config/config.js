const config = {
  port: process.env.PORT || 3000,
  jwtKey: process.env.JWT_KEY || '',
  mongoUser: process.env.MONGO_USER || '',
  mongoPass: process.env.MONGO_PASS || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  clientID: process.env.CLIENT_ID || '',
  callbackURL: process.env.CALLBACK_URL || '',
  contactsApiHost: process.env.CONTACTS_API_HOST || '',
  appUrl: process.env.APP_URL || '',
};

module.exports = config;
