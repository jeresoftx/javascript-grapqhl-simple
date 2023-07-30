const { getApolloServer } = require('../../src/graphql/server');

it('returns the version of graphql', async () => {
  const testServer = await getApolloServer();

  const response = await testServer.executeOperation({
    query: 'query {version }',
  });
  expect(response.errors).toBeUndefined();
  expect(response.data?.version).toContain('graphql-javacript-simple');
});
