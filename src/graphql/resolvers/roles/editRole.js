const { isAuthorized } = require('../../../middleware/isAuthorized');
const Role = require('../../../models/role');

const editRole = async (parent, data, context) => {
  isAuthorized(context);
  const { id, name, description } = data;
  const role = await Role.findOne({ _id: id }).exec();
  if (!role) {
    return null;
  }

  role.name = name;
  role.description = description;

  await role.save();
  return role;
};

module.exports = { editRole };
