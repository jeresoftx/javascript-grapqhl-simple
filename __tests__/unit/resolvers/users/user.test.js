const { user } = require('../../../../src/graphql/resolvers/users/user');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('User unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = user(null, { id: '6466bc0aa1ca2e6dca0597cb' });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('return a user', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await user(null, { id: '6466bc0aa1ca2e6dca0597cb' });
    const expectData = 'Joel Alvarez Mexia';

    expect(response.fullName).toBe(expectData);
  });
});
