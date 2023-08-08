/* eslint-disable no-underscore-dangle */
const { updateRole } = require('./updateRole');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const rolesData = require('../../../../data/roles.json');
const Role = require('../../../models/role');

describe('Update a role unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    let roles = await Role.find({});
    if (roles.length === 0) {
      await Role.insertMany(rolesData);
      roles = await Role.find({});
    }
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('returns a role data if the role was updated', async () => {
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
