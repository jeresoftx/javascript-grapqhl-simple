const versionQuery = require('./version/query');
const userQuery = require('./users/query');
const userMutation = require('./users/mutation');

const resolvers = {
  Query: {
    ...versionQuery,
    ...userQuery,
  },
  Mutation: {
    ...userMutation,
  },
};

module.exports = resolvers;
