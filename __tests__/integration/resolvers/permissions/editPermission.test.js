/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Permission = require('../../../../src/models/permission');
const permissionsData = require('../../../data/permissions.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const {
  mutationEditPermission,
} = require('./features/mutation/mutation.editPermission');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Edit permission unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can edit a new permission', async () => {
    isAuthorized.mockReturnValue(true);
    await Permission.deleteMany({});
    await Permission.insertMany(permissionsData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: mutationEditPermission,
        variables: {
          id: '6466bc0aa1ca2e5dca4294cb',
          name: 'test 1',
          description: 'test permission 1',
        },
      });
    const expectData = {
      id: '6466bc0aa1ca2e5dca4294cb',
      name: 'test 1',
      description: 'test permission 1',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    await expect(response.errors).toBeUndefined();
    await expect(response.body.data.editPermission).toMatchObject(expectData);
    await closeExpressServer();
  });
});
