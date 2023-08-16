/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Permission = require('../../../../src/models/permission');
const permissionData = require('../../../data/permissions.json');
const permissionExpected = require('../../../data/permissions.expected.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { queryPermissions } = require('./features/query/query.permissions');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Permission list integration test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Permission list', async () => {
    isAuthorized.mockReturnValue(true);
    await Permission.insertMany(permissionData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: queryPermissions,
        variables: { params: {} },
      });

    expect(response.errors).toBeUndefined();
    expect(response.body.data.permissions).toMatchObject(permissionExpected);
    await closeExpressServer(app);
  });
});
