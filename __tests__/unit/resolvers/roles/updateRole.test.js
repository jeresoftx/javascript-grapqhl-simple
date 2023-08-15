/* eslint-disable no-underscore-dangle */
const {
  updateRole,
} = require('../../../../src/graphql/resolvers/roles/updateRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Update a role unit test', () => {
  it('returns a role data if the role was updated', async () => {
    isAuthorized.mockReturnValue(true);

    const role = {
      id: '6466bc0aa1ca2e6dca1197bb',
      name: 'SUPER ADMIN',
      description: 'All permissions',
    };
    const expectedData = 'All permissions';
    const response = await updateRole(null, role);
    expect(response.description).toBe(expectedData);
  });

  it("Should be return false if the role doesn't exists", async () => {
    const role = {
      id: '1166bc0aa1ca2e6dca0597cf',
      name: 'role update',
      decription: 'role update',
    };
    const response = await updateRole(null, role);
    expect(response).toBeNull();
  });
});
