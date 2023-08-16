/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Role = require('../../../../src/models/role');
const rolesData = require('../../../data/roles.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const {
  mutationDeleteRole,
} = require('./features/mutation/mutation.deleteRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Delete role unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can delete a new role', async () => {
    isAuthorized.mockReturnValue(true);
    await Role.deleteMany({});
    await Role.insertMany(rolesData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: mutationDeleteRole,
        variables: {
          id: '6466bc0ba1ca2e6dca1297cb',
        },
      });
    await expect(response.errors).toBeUndefined();
    await expect(response.body.data.deleteRole).toEqual(true);
    await closeExpressServer();
  });
});
