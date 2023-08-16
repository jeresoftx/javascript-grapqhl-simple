/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Role = require('../../../../src/models/role');
const rolesData = require('../../../data/roles.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { queryRole } = require('./features/query/query.role');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Read role integration test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Read a Role', async () => {
    isAuthorized.mockReturnValue(true);
    await Role.insertMany(rolesData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: queryRole,
        variables: { id: '6466bc0aa1ca2e6dca1197bb' },
      });

    expect(response.errors).toBeUndefined();
    expect(response.body.data.role.name).toBe('SUPER ADMIN');
    await closeExpressServer();
  });
});
