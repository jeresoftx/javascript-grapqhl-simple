const { getApolloServer } = require('../../../../src/graphql/server');

describe('User test', () => {
  it('returns a users list', async () => {
    const testServer = await getApolloServer();

    const response = await testServer.executeOperation({
      query: 'query { users(params:{}) {id} }',
    });
    const expectData = [
      {
        id: '6466bc0aa1ca2e6dca0597cb',
      },
    ];

    expect(response.errors).toBeUndefined();
    expect(response.data?.users).toEqual(expectData);
  });
});
