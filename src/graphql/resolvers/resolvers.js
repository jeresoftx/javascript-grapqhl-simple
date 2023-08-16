const versionQuery = require('./version/query');
const userQuery = require('./users/query');
const userMutation = require('./users/mutation');
const permissionQuery = require('./permissions/query');
const permissionMutation = require('./permissions/mutation');

const resolvers = {
  Query: {
    ...versionQuery,
    ...userQuery,
    ...permissionQuery,
  },
  Mutation: {
    ...userMutation,
    ...permissionMutation,
  },
};

module.exports = resolvers;
