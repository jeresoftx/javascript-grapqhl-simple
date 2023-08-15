/* eslint-disable no-underscore-dangle */
const {
  deleteRole,
} = require('../../../../src/graphql/resolvers/roles/deleteRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Delete role unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = deleteRole(null, { id: '6466bc0ba1ca2e6dca1297cb' });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should returns true if the role was deleted', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await deleteRole(null, { id: '6466bc0ba1ca2e6dca1297cb' });
    expect(response).toBe(true);
  });

  it("Should be return false if the role doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
    const response = await deleteRole(null, {
      id: '1166bc0aa1ca2e6dca0597cf',
    });
    expect(response).toBe(false);
  });
});
