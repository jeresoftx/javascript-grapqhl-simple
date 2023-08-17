/* eslint-disable import/no-extraneous-dependencies */
const Dayjs = require('dayjs');

const { isAuthorized } = require('../../../middleware/isAuthorized');
const Role = require('../../../models/role');

const deleteRole = async (parent, { id }, context) => {
  isAuthorized(context);
  const role = await Role.findOne({ _id: id }).exec();
  if (!role) {
    return false;
  }
  const timestamp = Dayjs().toDate().getTime();
  role.name = `${role.name}-${timestamp}`;
  role.active = false;
  await role.save();
  return true;
};

module.exports = { deleteRole };
