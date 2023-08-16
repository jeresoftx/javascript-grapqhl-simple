/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');

describe('Version test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  afterAll(async () => {
    await closeExpressServer();
  });

  it('Should returns the version of graphql', async () => {
    const response = await request(app)
      .post('/graphql')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: 'query { version }',
      });
    expect(response.errors).toBeUndefined();
    expect(response.body?.data?.version).toContain('graphql-javacript-simple');
  });
});
