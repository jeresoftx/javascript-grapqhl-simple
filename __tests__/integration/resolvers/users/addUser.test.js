/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const Dayjs = require('dayjs');

const User = require('../../../../src/models/user');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/expressServer');
const { mutationAddUser } = require('./features/mutation/mutation.addUser');

test('Can Add a new user', async () => {
  const express = await expressServer({});
  const { app } = express;
  await User.deleteMany({});
  const timestamp = Dayjs().toDate().getTime();
  const response = await request(app)
    .post('/graphql')
    .set('content-type', 'application/json')
    .set('uer-agent', 'jest')
    .send({
      query: mutationAddUser,
      variables: {
        name: 'Benjamin',
        lastName: 'Alvarez',
        username: `benAlvarez-${timestamp}`,
        email: 'jeresoft+2@gmail.com',
        phone: '6691210703',
        password: 'cochiverde',
      },
    });
  const expectData = {
    addUser: {
      fullName: 'Benjamin Alvarez',
    },
  };
  await expect(response.errors).toBeUndefined();
  await expect(response.body?.data).toMatchObject(expectData);
  await closeExpressServer();
});
