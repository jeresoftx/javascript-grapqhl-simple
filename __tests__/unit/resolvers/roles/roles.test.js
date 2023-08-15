const { roles } = require('../../../../src/graphql/resolvers/roles/roles');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Roles unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });

    const response = roles(null, { params: {} });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a roles list', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await roles(null, { params: {} });
    const expectData = '6466bc0aa1ca2e6dca1197bb';
    expect(response[0].id).toBe(expectData);
  });
});
