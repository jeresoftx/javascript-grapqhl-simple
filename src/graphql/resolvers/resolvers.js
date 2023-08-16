const versionQuery = require('./version/query');
const userQuery = require('./users/query');
const userMutation = require('./users/mutation');
const permissionQuery = require('./permissions/query');
const permissionMutation = require('./permissions/mutation');
const roleQuery = require('./roles/query');
const roleMutation = require('./roles/mutation');

const resolvers = {
  Query: {
    ...versionQuery,
    ...userQuery,
    ...permissionQuery,
    ...roleQuery,
  },
  Mutation: {
    ...userMutation,
    ...permissionMutation,
    ...roleMutation,
  },
};

module.exports = resolvers;
