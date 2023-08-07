const { users } = require('./users');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const usersData = require('../../../../data/users.json');
const User = require('../../../models/user');

describe('Users unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    await User.insertMany(usersData);
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('returns a users list', async () => {
    const response = await users(null, { params: {} });
    const expectData = [
      {
        id: '6466bc0aa1ca2e6dca0597cb',
      },
    ];

    expect(response).toMatchObject(expectData);
  });
});
