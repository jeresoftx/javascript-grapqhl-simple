const { addRole } = require('../../../../src/graphql/resolvers/roles/addRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Add role unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const role = {
      name: 'User 2',
      description: 'user 2',
      permissions: [
        { id: '6466bc0aa1ca2e6dca0597bb', permission: 'users' },
        { id: '6462bc0aa1ca2e6dca0597cb', permission: 'user' },
      ],
    };
    const response = addRole(null, role);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a new role', async () => {
    isAuthorized.mockReturnValue(true);
    const role = {
      name: 'User 2',
      description: 'user 2',
      permissions: [
        { id: '6466bc0aa1ca2e6dca0597bb', permission: 'users' },
        { id: '6462bc0aa1ca2e6dca0597cb', permission: 'user' },
      ],
    };
    const response = await addRole(null, role);

    const expectData = {
      id: expect.any(String),
      name: role.name,
      description: role.description,
    };

    expect(response).toMatchObject(expectData);
  });
});
