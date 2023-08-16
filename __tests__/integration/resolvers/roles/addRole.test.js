/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Role = require('../../../../src/models/role');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { mutationAddRole } = require('./features/mutation/mutation.addRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Add role unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can Add a new role', async () => {
    isAuthorized.mockReturnValue(true);
    await Role.deleteMany({});
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: mutationAddRole,
        variables: {
          name: 'test 1',
          description: 'test role 1',
          permissions: [
            { id: '6466bc0aa1ca2e6dca0597bb', permission: 'users' },
            { id: '1466bc0aa1ca2e6dca0597cb', permission: 'user' },
          ],
        },
      });
    const expectData = {
      id: expect.any(String),
      name: 'test 1',
      description: 'test role 1',
      permissions: [
        { id: '6466bc0aa1ca2e6dca0597bb', permission: 'users' },
        { id: '1466bc0aa1ca2e6dca0597cb', permission: 'user' },
      ],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    await expect(response.errors).toBeUndefined();
    console.log(response.body);
    await expect(response.body.data.addRole).toMatchObject(expectData);
    await closeExpressServer();
  });
});
