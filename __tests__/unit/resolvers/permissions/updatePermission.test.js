/* eslint-disable no-underscore-dangle */
const {
  updatePermission,
} = require('../../../../src/graphql/resolvers/permissions/updatePermission');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Update a permission unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const permission = {
      id: '6466bc0aa1ca2e6dca0597bb',
      name: 'permission update',
      decription: 'permission update',
    };
    const response = updatePermission(null, permission);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a permission data if the permission was updated', async () => {
    isAuthorized.mockReturnValue(true);
    const permission = {
      id: '6466bc0aa1ca2e6dca0597bb',
      name: 'permission update',
      decription: 'permission update',
    };
    const response = await updatePermission(null, permission);
    const expectedData = 'permission update';

    expect(response.name).toBe(expectedData);
  });

  it("Should be return false if the permission doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
    const permission = {
      id: '1166bc0aa1ca2e6dca0597cf',
      name: 'permission update',
      decription: 'permission update',
    };
    const response = await updatePermission(null, permission);
    expect(response).toBeNull();
  });
});
