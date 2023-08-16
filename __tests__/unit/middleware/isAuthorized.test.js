/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
const mockingoose = require('mockingoose');
const jwt = require('jsonwebtoken');

const { isAuthorized } = require('../../../src/middleware/isAuthorized');

const Role = require('../../../src/models/role');

describe('Test Authorization middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: false,
    };
    const response = isAuthorized(context);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: true,
    };
    const response = isAuthorized(context);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: true,
      roles: ['*'],
    };
    const response = await isAuthorized(context);
    expect(response).toBe(true);
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: true,
      roles: ['USERS'],
      operation: 'deleteRole',
    };
    mockingoose(Role).toReturn(
      [
        {
          _id: '6466bc0aa1ca2e6dca1197bb',
          name: 'USERS',
          permissions: [
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'users',
            },
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'user',
            },
          ],
        },
        {
          _id: '6466bc0aa1ca2e6dca1197bb',
          name: 'USERS2',
          permissions: [
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'deleteUser',
            },
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'addUser',
            },
          ],
        },
      ],
      'find',
    );
    const response = isAuthorized(context);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: true,
      roles: ['USERS'],
      operation: 'deleteRole',
    };
    mockingoose(Role).toReturn(
      [
        {
          _id: '6466bc0aa1ca2e6dca1197bb',
          name: 'USERS',
          permissions: [
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'users',
            },
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'user',
            },
          ],
        },
        {
          _id: '6466bc0aa1ca2e6dca1197bb',
          name: 'USERS2',
          permissions: [
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'deleteUser',
            },
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: 'addUser',
            },
          ],
        },
      ],
      'find',
    );
    const response = isAuthorized(context);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: true,
      roles: ['USERS'],
      operation: 'deleteRole',
    };
    mockingoose(Role).toReturn(
      [
        {
          _id: '6466bc0aa1ca2e6dca1197bb',
          name: 'USERS',
          permissions: [],
        },
      ],
      'find',
    );
    const response = isAuthorized(context);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: true,
      roles: ['USERS'],
      operation: 'deleteRole',
    };
    mockingoose(Role).toReturn([], 'find');
    const response = isAuthorized(context);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('Should be auth equal to false without authorization headers', async () => {
    const context = {
      isAuth: true,
      roles: ['SUPER ADMIN'],
      operation: 'users',
    };
    mockingoose(Role).toReturn(
      [
        {
          _id: '6466bc0aa1ca2e6dca1197bb',
          name: 'SUPER ADMIN',
          permissions: [
            {
              id: '6466bc0aa1ca2e2dca0597bf',
              permission: '*',
            },
          ],
        },
      ],
      'find',
    );
    const response = await isAuthorized(context);
    expect(response).toBe(true);
  });
});
