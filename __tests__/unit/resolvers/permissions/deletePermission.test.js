/* eslint-disable no-underscore-dangle */
const {
  deletePermission,
} = require('../../../../src/graphql/resolvers/permissions/deletePermission');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Delete permission unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = deletePermission(null, {
      id: '6466bc0aa1ca2e5dca5294cb',
    });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should returns true if the permission was deleted', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await deletePermission(null, {
      id: '6466bc0aa1ca2e5dca5294cb',
    });
    expect(response).toBe(true);
  });

  it("Should be return false if the permission doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
    const response = await deletePermission(null, {
      id: '1166bc0aa1ca2e6dca0597cf',
    });
    expect(response).toBe(false);
  });
});
