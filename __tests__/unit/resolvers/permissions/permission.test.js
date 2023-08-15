const {
  permission,
} = require('../../../../src/graphql/resolvers/permissions/permission');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Permission unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = permission(null, {
      id: '6466bc0aa1ca2e6dca0597bf',
    });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('return a permission', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await permission(null, { id: '6466bc0aa1ca2e6dca0597bf' });
    const expectData = {
      name: '*',
    };

    expect(response).toMatchObject(expectData);
  });
});
