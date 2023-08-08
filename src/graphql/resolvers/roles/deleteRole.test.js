/* eslint-disable no-underscore-dangle */
const { deleteRole } = require('./deleteRole');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const rolesData = require('../../../../data/roles.json');
const Role = require('../../../models/role');

describe('Delete role unit test', () => {
  let idRole = null;

  beforeAll(async () => {
    await connectDB({});
    let roles = await Role.find({});
    if (roles.length === 0) {
      await Role.insertMany(rolesData);
      roles = await Role.find({});
    }
    idRole = roles[0].id;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('Should returns true if the role was deleted', async () => {
    const response = await deleteRole(null, { id: idRole });
    expect(response).toBe(true);
  });

  it("Should be return false if the role doesn't exists", async () => {
    const response = await deleteRole(null, {
      id: '1166bc0aa1ca2e6dca0597cf',
    });
    expect(response).toBe(false);
  });
});
