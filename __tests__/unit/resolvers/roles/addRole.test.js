const { addRole } = require('../../../../src/graphql/resolvers/roles/addRole');

describe('Add role unit test', () => {
  it('returns a new role', async () => {
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
