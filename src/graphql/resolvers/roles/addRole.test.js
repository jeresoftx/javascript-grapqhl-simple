const { addRole } = require('./addRole');
const { connectDB, disconnectDB } = require('../../../db/connectDB');

describe('Add role unit test', () => {
  beforeAll(async () => {
    await connectDB({});
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('returns a new role', async () => {
    const role = {
      name: 'User 2',
      description: 'user 2',
      permissions: [
        { _id: '6466bc0aa1ca2e6dca0597bb', permission: 'users' },
        { _id: '6466bc0aa1ca2e6dca0597cb', permission: 'user' },
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
