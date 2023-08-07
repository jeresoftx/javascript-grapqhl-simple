const { addUser } = require('./addUser');
const { connectDB, disconnectDB } = require('../../../db/connectDB');

describe('Add user unit test', () => {
  beforeAll(async () => {
    await connectDB({});
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('returns a new user', async () => {
    const user = {
      name: 'Benjamin',
      lastName: 'Alvarez',
      username: 'benAlvarez',
      email: 'jeresoft+2@gmail.com',
      phone: '6691210703',
      password: 'cochiverde',
    };
    const response = await addUser(null, user);

    const expectData = {
      id: expect.any(String),
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      password: expect.any(String),
      fullName: `${user.name} ${user.lastName}`,
      emails: [
        {
          email: user.email,
          main: true,
        },
      ],
      phones: [
        {
          phone: user.phone,
          main: true,
        },
      ],
      roles: [],
    };

    expect(response).toMatchObject(expectData);
  });
});

describe('Add user unit test', () => {
  beforeAll(async () => {
    await connectDB({ testing: false });
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('Should be returns a error', async () => {
    const user = {
      name: 'Benjamin',
      lastName: 'Alvarez',
      username: 'benAlvarez',
      email: 'jeresoft+2@gmail.com',
      phone: '6691210703',
      password: 'cochiverde',
    };
    await expect(addUser(null, user)).resolves.toThrowError(
      'The username already exists!, try with another one',
    );
  });
});
