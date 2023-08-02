const versionQuery = require('./version/query');
const usersQuery = require('./users/query');

const resolvers = {
  Query: {
    ...versionQuery,
    ...usersQuery,
  },
};

module.exports = resolvers;
