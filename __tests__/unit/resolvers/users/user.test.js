const { user } = require('../../../../src/graphql/resolvers/users/user');

describe('User unit test', () => {
  it('return a user', async () => {
    const response = await user(null, { id: '6466bc0aa1ca2e6dca0597cb' });
    const expectData = 'Joel Alvarez Mexia';

    expect(response.fullName).toBe(expectData);
  });
});
