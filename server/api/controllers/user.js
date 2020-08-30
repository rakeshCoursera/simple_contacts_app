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

    return { statusCode: 200, data: user };
  } catch (err) {
    return { statusCode: 500, message: `Something went wrong while updating db, error: ${err.message}` };
  }
};

const findUser = async (profile) => {
  try {
    const user = await User.findOne({ googleId: profile.id }).exec();
    return { statusCode: 200, data: user };
  } catch (err) {
    return { statusCode: 500, message: `Something went wrong while fetching user details from db, error: ${err.message}` };
  }
};

module.exports = {
  findOrCreateUser,
  findUser,
};
