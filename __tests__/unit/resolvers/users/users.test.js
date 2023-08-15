const { users } = require('../../../../src/graphql/resolvers/users/users');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Users unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });

    const response = users(null, { params: {} });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a users list', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await users(null, { params: {} });

    expect(response[0].id.toString()).toBe('6466bc0aa1ca2e6dca0597cb');
  });
});
