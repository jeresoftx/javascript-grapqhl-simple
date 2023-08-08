const { roles } = require('./roles');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const rolesData = require('../../../../data/roles.json');
const Role = require('../../../models/role');

describe('Roles unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    await Role.insertMany(rolesData);
  });

  afterAll(async () => {
    await disconnectDB({});
  });

  it('returns a roles list', async () => {
    const response = await roles(null, { params: {} });
    const expectData = '6466bc0aa1ca2e6dca1197bb';
    expect(response[0].id).toBe(expectData);
  });
});
