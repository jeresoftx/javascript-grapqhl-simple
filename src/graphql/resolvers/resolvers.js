const versionQuery = require('./version/query');
const usersQuery = require('./users/query');
const usersMutation = require('./users/mutation');

const resolvers = {
  Query: {
    ...versionQuery,
    ...usersQuery,
  },
  Mutation: {
    ...usersMutation,
  },
};

module.exports = resolvers;
