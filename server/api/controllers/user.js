const { User } = require('../models/user');

// function to manage the user signup requirements
const findOrCreateUser = async (profile, token) => {
  try {
    const {
      id, displayName, emails, photos,
    } = profile;
    const user = await User.updateOne(
      { googleId: profile.id },
      {
        googleId: id,
        username: displayName,
        email: emails[0].value,
        picture: photos[0].value,
        accessToken: token,
      },
      { upsert: true },
    ).exec();

    return user;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findOrCreateUser,
};
