/* eslint-disable import/no-extraneous-dependencies */
const Dayjs = require('dayjs');

const Permission = require('../../../models/permission');

const deletePermission = async (parent, { id }) => {
  const permission = await Permission.findOne({ _id: id });
  if (!permission) {
    return false;
  }
  const timestamp = Dayjs().toDate().getTime();
  permission.name = `${permission.name}-${timestamp}`;
  permission.active = false;
  await permission.save();
  return true;
};

module.exports = { deletePermission };
