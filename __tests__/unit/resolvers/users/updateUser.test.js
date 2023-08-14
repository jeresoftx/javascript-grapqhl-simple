/* eslint-disable no-underscore-dangle */
const {
  updateUser,
} = require('../../../../src/graphql/resolvers/users/updateUser');

describe('Update a user unit test', () => {
  it("returns null data if the user wasn't exists", async () => {
    const user = {
      id: '6466bc0aa1ca2e6dca0597cb',
      name: 'Ernesto',
      lastName: 'Gomez',
    };
    const response = await updateUser(null, user);

    expect(response.fullName).toBe('Ernesto Gomez');
  });

  it("Should be return false if the permission doesn't exists", async () => {
    const user = {
      id: '1166bc0aa1ca2e6dca0597cf',
      name: 'Ernesto',
      lastName: 'Gomez',
    };
    const response = await updateUser(null, user);
    expect(response).toBeNull();
  });
});
