const { users } = require('../../../../src/graphql/resolvers/users/users');

describe('Users unit test', () => {
  it('returns a users list', async () => {
    const response = await users(null, { params: {} });

    expect(response[0].id.toString()).toBe('6466bc0aa1ca2e6dca0597cb');
  });
});
