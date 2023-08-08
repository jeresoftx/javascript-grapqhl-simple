/* eslint-disable import/no-extraneous-dependencies */
const Dayjs = require('dayjs');

const Role = require('../../../models/role');

const deleteRole = async (parent, { id }) => {
  const role = await Role.findOne({ _id: id });
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
