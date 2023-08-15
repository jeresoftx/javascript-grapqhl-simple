/* eslint-disable no-underscore-dangle */
const {
  deleteUser,
} = require('../../../../src/graphql/resolvers/users/deleteUser');
const User = require('../../../../src/models/user');
const deleteUserData = require('../../../data/deleteUser.json');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Delete user unit test', () => {
  beforeAll(async () => {
    await User.insertMany(deleteUserData);
  });
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });

    const response = deleteUser(null, { id: '6466bc0aa1ca2e6dca0597cd' });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should returns true if the user was deleted', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await deleteUser(null, { id: '6466bc0aa1ca2e6dca0597cd' });
    expect(response).toBe(true);
  });

  it("Should returns false if the user doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
    const response = await deleteUser(null, { id: '1166bc0aa1ca2e6dca0597cf' });
    expect(response).toBe(false);
  });
});
