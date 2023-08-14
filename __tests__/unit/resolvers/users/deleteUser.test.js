/* eslint-disable no-underscore-dangle */
const {
  deleteUser,
} = require('../../../../src/graphql/resolvers/users/deleteUser');
const User = require('../../../../src/models/user');
const deleteUserData = require('../../../data/deleteUser.json');

describe('Delete user unit test', () => {
  beforeAll(async () => {
    await User.insertMany(deleteUserData);
  });

  it('Should returns true if the user was deleted', async () => {
    const response = await deleteUser(null, { id: '6466bc0aa1ca2e6dca0597cd' });
    expect(response).toBe(true);
  });

  it("Should returns false if the user doesn't exists", async () => {
    const response = await deleteUser(null, { id: '1166bc0aa1ca2e6dca0597cf' });
    expect(response).toBe(false);
  });
});
