/* eslint-disable no-underscore-dangle */
const {
  editUser,
} = require('../../../../src/graphql/resolvers/users/editUser');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Update a user unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const user = {
      id: '6466bc0aa1ca2e6dca0597cb',
      name: 'Ernesto',
      lastName: 'Gomez',
    };
    const response = editUser(null, user);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it("returns null data if the user wasn't exists", async () => {
    isAuthorized.mockReturnValue(true);
    const user = {
      id: '6466bc0aa1ca2e6dca0597cb',
      name: 'Ernesto',
      lastName: 'Gomez',
    };
    const response = await editUser(null, user);

    expect(response.fullName).toBe('Ernesto Gomez');
  });

  it("Should be return false if the permission doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
    const user = {
      id: '1166bc0aa1ca2e6dca0597cf',
      name: 'Ernesto',
      lastName: 'Gomez',
    };
    const response = await editUser(null, user);
    expect(response).toBeNull();
  });
});
