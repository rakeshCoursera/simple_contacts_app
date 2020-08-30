const config = {
  port: process.env.PORT || 3000,
  mongoUser: process.env.MONGO_USER || '',
  mongoPass: process.env.MONGO_PASS || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  clientID: process.env.CLIENT_ID || '',
  callbackURL: process.env.CALLBACK_URL || '',
  contactsApiHost: process.env.CONTACTS_API_HOST || '',
};

module.exports = config;
