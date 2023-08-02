const { users } = require('./users');

describe('Users unit test', () => {
  it('returns a users list', async () => {
    const response = await users(null, { params: {} });

    const expectData = '6466bc0aa1ca2e6dca0597cb';

    expect(response[0].id).toEqual(expectData);
  });
});
