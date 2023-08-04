const { user } = require('./user');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const usersData = require('../../../../data/users.json');
const User = require('../../../models/user');

describe('User unit test', () => {
  beforeAll(async () => {
    connectDB();
    await User.insertMany(usersData);
  });

  afterAll(async () => {
    disconnectDB();
  });

  it('return a user', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const response = await user(null, { id: usersData[0]._id });
    const expectData = {
      fullName: `${usersData[0].name} ${usersData[0].lastName}`,
    };

    expect(response).toMatchObject(expectData);
  });
});
