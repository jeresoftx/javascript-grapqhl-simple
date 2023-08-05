/* eslint-disable no-underscore-dangle */
const { deleteUser } = require('./deleteUser');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const usersData = require('../../../../data/users.json');
const User = require('../../../models/user');

describe('Add user unit test', () => {
  let idUser = null;

  beforeAll(async () => {
    await connectDB();
    let users = await User.find({});
    if (users.length === 0) {
      console.log('entro');
      await User.insertMany(usersData);
      users = await User.find({});
    }
    console.log(users);
    idUser = users[0].id;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('returns a new user', async () => {
    const response = await deleteUser(null, { id: idUser });
    expect(response).toBe(true);
  });
});
