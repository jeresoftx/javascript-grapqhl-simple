const version = require('./version/query');

const resolvers = {
  Query: {
    ...version,
  },
};

module.exports = resolvers;
