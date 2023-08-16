/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Role = require('../../../../src/models/role');
const roleData = require('../../../data/roles.json');
const roleExpected = require('../../../data/roles.expected.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { queryRoles } = require('./features/query/query.roles');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Role list integration test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Role list', async () => {
    isAuthorized.mockReturnValue(true);
    await Role.insertMany(roleData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: queryRoles,
        variables: { params: {} },
      });

    expect(response.errors).toBeUndefined();
    expect(response.body.data.roles).toMatchObject(roleExpected);
    await closeExpressServer(app);
  });
});
