const { isAuthorized } = require('../../../middleware/isAuthorized');
const User = require('../../../models/user');

const user = async (parent, { id }, context) => {
  isAuthorized(context);
  const userData = await User.findOne({ _id: id });

  return userData;
};

module.exports = { user };
