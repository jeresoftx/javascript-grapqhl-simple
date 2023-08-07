/* eslint-disable no-underscore-dangle */
const { updateUser } = require('./updateUser');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const usersData = require('../../../../data/users.json');
const User = require('../../../models/user');

describe('Update a user unit test', () => {
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

  it('returns a user data if the user was updated', async () => {
    const user = {
      id: idUser,
      name: 'Ernesto',
      lastName: 'Gomez',
    };
    const expectData = 'Ernesto Gomez';
    const response = await updateUser(null, user);

    expect(response.fullName).toBe(expectData);
  });
});
