const {
  permissions,
} = require('../../../../src/graphql/resolvers/permissions/permissions');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Permissions unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = permissions(null, { params: {} });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a permissions list', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await permissions(null, { params: {} });
    const expectData = '6466bc0aa1ca2e6dca0597bf';
    expect(response[0].id).toBe(expectData);
  });
});
