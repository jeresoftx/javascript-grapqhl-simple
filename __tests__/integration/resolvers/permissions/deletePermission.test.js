/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Permission = require('../../../../src/models/permission');
const permissionsData = require('../../../data/permissions.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const {
  mutationDeletePermission,
} = require('./features/mutation/mutation.deletePermission');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Add permission unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can Add a new permission', async () => {
    isAuthorized.mockReturnValue(true);
    await Permission.deleteMany({});
    await Permission.insertMany(permissionsData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: mutationDeletePermission,
        variables: {
          id: '6466bc0aa1ca2e5dca4294cb',
        },
      });
    await expect(response.errors).toBeUndefined();
    await expect(response.body?.data?.deletePermission).toEqual(true);
    await closeExpressServer();
  });
});
