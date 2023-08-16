/* eslint-disable no-underscore-dangle */
const {
  editPermission,
} = require('../../../../src/graphql/resolvers/permissions/editPermission');
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
      name: 'permission edit',
      decription: 'permission edit',
    };
    const response = editPermission(null, permission);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a permission data if the permission was editd', async () => {
    isAuthorized.mockReturnValue(true);
    const permission = {
      id: '6466bc0aa1ca2e6dca0597bb',
      name: 'permission edit',
      decription: 'permission edit',
    };
    const response = await editPermission(null, permission);
    const expectedData = 'permission edit';

    expect(response.name).toBe(expectedData);
  });

  it("Should be return false if the permission doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
    const permission = {
      id: '1166bc0aa1ca2e6dca0597cf',
      name: 'permission edit',
      decription: 'permission edit',
    };
    const response = await editPermission(null, permission);
    expect(response).toBeNull();
  });
});
