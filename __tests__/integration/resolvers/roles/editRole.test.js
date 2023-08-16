/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Role = require('../../../../src/models/role');
const rolesData = require('../../../data/roles.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { mutationEditRole } = require('./features/mutation/mutation.editRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Edit role unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can edit a new role', async () => {
    isAuthorized.mockReturnValue(true);
    await Role.deleteMany({});
    await Role.insertMany(rolesData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: mutationEditRole,
        variables: {
          id: '6466bc0ba1ca2e6dca1297cb',
          name: 'test 1',
          description: 'test role 1',
        },
      });
    const expectData = {
      id: '6466bc0ba1ca2e6dca1297cb',
      name: 'test 1',
      description: 'test role 1',
      permissions: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    await expect(response.errors).toBeUndefined();
    await expect(response.body.data.editRole).toMatchObject(expectData);
    await closeExpressServer();
  });
});
