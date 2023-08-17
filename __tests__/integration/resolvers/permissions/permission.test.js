/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Permission = require('../../../../src/models/permission');
const permissionsData = require('../../../data/permissions.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { queryPermission } = require('./features/query/query.permission');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Read permission integration test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Read a Permission', async () => {
    isAuthorized.mockReturnValue(true);
    await Permission.insertMany(permissionsData).exec();
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: queryPermission,
        variables: { id: '6466bc0aa1ca2e6dca0597bf' },
      });

    expect(response.errors).toBeUndefined();
    expect(response.body?.data?.permission?.name).toBe('*');
    await closeExpressServer();
  });
});
