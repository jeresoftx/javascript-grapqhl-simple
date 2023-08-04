const User = require('../../../models/user');

const user = async (parent, { id }) => {
  const userData = await User.findOne({ _id: id });

  return userData;
};

module.exports = { user };
