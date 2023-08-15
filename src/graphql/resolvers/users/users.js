const { isAuthorized } = require('../../../middleware/isAuthorized');
const User = require('../../../models/user');

const users = async (parent, { params }, context) => {
  isAuthorized(context);
  const {
    offset = 0,
    limit = 10,
    filter = {},
    sort = { fullName: 1 },
  } = params;

  const data = await User.find(filter).skip(offset).limit(limit).sort(sort);

  return data;
};

module.exports = { users };
