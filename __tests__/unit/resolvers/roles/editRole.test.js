/* eslint-disable no-underscore-dangle */
const {
  editRole,
} = require('../../../../src/graphql/resolvers/roles/editRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Update a role unit test', () => {
  it('returns a role data if the role was editd', async () => {
    isAuthorized.mockReturnValue(true);

    const role = {
      id: '6466bc0aa1ca2e6dca1197bb',
      name: 'SUPER ADMIN',
      description: 'All permissions',
    };
    const expectedData = 'All permissions';
    const response = await editRole(null, role);
    expect(response.description).toBe(expectedData);
  });

  it("Should be return false if the role doesn't exists", async () => {
    const role = {
      id: '1166bc0aa1ca2e6dca0597cf',
      name: 'role edit',
      decription: 'role edit',
    };
    const response = await editRole(null, role);
    expect(response).toBeNull();
  });
});
