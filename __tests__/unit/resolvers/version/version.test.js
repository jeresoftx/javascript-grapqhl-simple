/* eslint-disable no-underscore-dangle */
const {
  versionQ,
} = require('../../../../src/graphql/resolvers/version/version');

describe('Graphql version', () => {
  it('Should return the graphql current version', async () => {
    const response = await versionQ();
    expect(response).toMatch(
      /graphql-javacript-simple - v\d\.\d\.\d A simple graphql in javascript using apollo server/,
    );
  });
});
