/* eslint-disable no-underscore-dangle */
const { deleteUser } = require('./deleteUser');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const usersData = require('../../../../data/users.json');
const User = require('../../../models/user');

describe('Delete user unit test', () => {
  let idUser = null;

  beforeAll(async () => {
    await connectDB({});
    let users = await User.find({});
    if (users.length === 0) {
      await User.insertMany(usersData);
      users = await User.find({});
    }
    idUser = users[0].id;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('Should returns true if the user was deleted', async () => {
    const response = await deleteUser(null, { id: idUser });
    expect(response).toBe(true);
  });

  it("Should be return false if the user doesn't exists", async () => {
    const response = await deleteUser(null, { id: '1166bc0aa1ca2e6dca0597cf' });
    expect(response).toBe(false);
  });
});
