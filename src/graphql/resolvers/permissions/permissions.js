const { isAuthorized } = require('../../../middleware/isAuthorized');
const Permission = require('../../../models/permission');

const permissions = async (parent, { params }, context) => {
  isAuthorized(context);
  const {
    offset = 0,
    limit = 10,
    filter = {},
    sort = { fullName: 1 },
  } = params;

  const data = await Permission.find(filter)
    .skip(offset)
    .limit(limit)
    .sort(sort);

  return data;
};

module.exports = { permissions };
