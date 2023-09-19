const { isAuthorized } = require('../../../middleware/isAuthorized');
const Role = require('../../../models/role');

const roles = async (parent, { params }, context) => {
  await isAuthorized(context);
  const {
    offset = 0,
    limit = 10,
    filter = {},
    sort = { fullName: 1 },
  } = params;

  const data = await Role.find(filter)
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .exec();

  return data;
};

module.exports = { roles };
