const Permission = require('../../../models/permission');

const permissions = async (parent, { params }) => {
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
