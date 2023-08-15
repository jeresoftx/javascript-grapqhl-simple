/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
const mockingoose = require('mockingoose');
const jwt = require('jsonwebtoken');

const { auth } = require('../../../src/middleware/auth');
const { mockRequest, mockResponse } = require('./__mocks__/Request.mock');

const Token = require('../../../src/models/token');

describe('Test Authorization middleware', () => {
  beforeEach(() => {});

  it('Should be auth equal to false without authorization headers', async () => {
    const req = mockRequest({});
    const res = mockResponse({});
    await auth(req, res, () => {});
    await expect(res.isAuth).toBe(false);
  });

  it('Should be auth equal to false without token', async () => {
    const req = mockRequest({
      Authorization: 'Bearer',
    });
    const res = mockResponse({});
    await auth(req, res, () => {});
    await expect(res.isAuth).toBe(false);
  });

  it('Should be auth equal to false without token into the database', async () => {
    const req = mockRequest({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2YmMwYWExY2EyZTZkY2EwNTk3Y2IiLCJ1c2VybmFtZSI6ImplcmVzb2Z0IiwiaWF0IjoxNjkxNzI0NzA0LCJleHAiOjE2OTQzMTY3MDR9.ThnuPMCitWz0eUhowl4VinQrI8p4dmXfxCpSz77Cvok',
    });
    const res = mockResponse({});
    await auth(req, res, () => {});
    await expect(res.isAuth).toBe(false);
  });

  it('should return auth true', async () => {
    mockingoose(Token).toReturn(
      {
        _id: '64d5aba0ce590b034c6f2b6b',
        expiresIn: 'experies',
        userAgent: 'jest',
        type: 'LOGIN',
        token: 'token',
        userId: '6466bc0aa1ca2e6dca0597cb',
        active: true,
      },
      'findOne',
    );
    const res = {};
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2YmMwYWExY2EyZTZkY2EwNTk3Y2IiLCJ1c2VybmFtZSI6ImplcmVzb2Z0IiwiaWF0IjoxNjkxNzI0NzA0LCJleHAiOjE2OTQzMTY3MDR9.ThnuPMCitWz0eUhowl4VinQrI8p4dmXfxCpSz77Cvok';
    const req = mockRequest({
      Authorization: `Bearer ${token}`,
      'user-agent': 'jest',
    });
    await auth(req, res, () => {});
    await expect(res.isAuth).toBe(true);
  });

  it('should return auth true', async () => {
    mockingoose(Token).toReturn(
      {
        _id: '64d5aba0ce590b034c6f2b6b',
        expiresIn: 'experies',
        userAgent: 'jest',
        type: 'APP',
        token: 'token',
        userId: '6466bc0aa1ca2e6dca0597cb',
        active: true,
      },
      'findOne',
    );
    const res = {};
    const token2 =
      'edJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2YmMwYWExY2EyZTZkY2EwNTk3Y2IiLCJ1c2VybmFtZSI6ImplcmVzb2Z0IiwiaWF0IjoxNjkxNzI0NzA0LCJleHAiOjE2OTQzMTY3MDR9.ThnuPMCitWz0eUhowl4VinQrI8p4dmXfxCpSz77Cvok';
    const req = mockRequest({
      Authorization: `Bearer ${token2}`,
      'user-agent': 'jest',
    });
    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn((token, secretOrPublicKey, callback) => {
        const result = {
          userId: '6466bc0aa1ca2e6dca0597cb',
          email: 'cool@dude.com',
        };
        return result;
      }),
    );
    await auth(req, res, () => {});
    await expect(res.isAuth).toBe(true);
  });

  it('should return auth false (the token is wrong encode)', async () => {
    mockingoose(Token).toReturn(
      {
        _id: '64d5aba0ce590b034c6f2b6b',
        expiresIn: 'experies',
        userAgent: 'jest',
        type: 'APP',
        token: 'token',
        userId: '6466bc0aa1ca2e6dca0597cb',
        active: true,
      },
      'findOne',
    );
    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn((token, secretOrPublicKey, callback) => {
        throw new Error('jwt error');
      }),
    );
    const res = {};
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWfiOiI2NDY2YmMwYWExY2EyZTZkY2EwNTk3Y2IiLCJ1c2VybmFtZSI6ImplcmVzb2Z0IiwiaWF0IjoxNjkxNzI0NzA0LCJleHAiOjE2OTQzMTY3MDR9.ThnuPMCitWz0eUhowl4VinQrI8p4dmXfxCpSz77Cvok';
    const req = mockRequest({
      Authorization: `Bearer ${token}`,
      'user-agent': 'jest',
    });
    await auth(req, res, () => {});
    await expect(res.isAuth).toBe(false);
  });

  it('should return auth false because the token type is wrong', async () => {
    mockingoose(Token).toReturn(
      {
        _id: '64d5aba0ce590b034c6f2b6b',
        expiresIn: 'experies',
        userAgent: 'jest',
        type: 'REFRESH',
        token: 'token',
        userId: '6466bc0aa1ca2e6dca0597cb',
        active: true,
      },
      'findOne',
    );
    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn((token, secretOrPublicKey, callback) => {
        const result = {
          userId: '6466bc0aa1ca2e6dca0597cb',
          email: 'cool@dude.com',
        };
        return result;
      }),
    );
    const res = {};
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2YmMwYWExY2EyZTZkY2EwNTk3Y2IiLCJ1c2VybmFtZSI6ImplcmVzb2Z0IiwiaWF0IjoxNjkxNzI0NzA0LCJleHAiOjE2OTQzMTY3MDR9.ThnuPMCitWz0eUhowl4VinQrI8p4dmXfxCpSz77Cvok';
    const req = mockRequest({
      Authorization: `Bearer ${token}`,
      'user-agent': 'jest',
    });
    await auth(req, res, () => {});
    await expect(res.isAuth).toBe(false);
  });
});
