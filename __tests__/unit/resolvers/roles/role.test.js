const { role } = require('../../../../src/graphql/resolvers/roles/role');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Role unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = role(null, { id: '6466bc0aa1ca2e6dca1197bb' });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('return a role', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await role(null, { id: '6466bc0aa1ca2e6dca1197bb' });
    const expectData = {
      name: 'SUPER ADMIN',
    };

    expect(response).toMatchObject(expectData);
  });
});
