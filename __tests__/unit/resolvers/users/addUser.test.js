const { addUser } = require('../../../../src/graphql/resolvers/users/addUser');

describe('Add user', () => {
  it('Should returns a new user', async () => {
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

  it('Should returns an Error because the name is require', async () => {
    const user = {
      lastName: 'Alvarez',
      username: 'benAlvarez',
      email: 'jeresoft+2@gmail.com',
      phone: '6691210703',
      password: 'cochiverde',
    };

    await expect(addUser(null, user)).rejects.toThrowError(
      'User validation failed: name: Path `name` is required.',
    );
  });

  it('Should returns an Error because the paword is require', async () => {
    const user = {
      name: 'Benjamin',
      lastName: 'Alvarez',
      username: 'benAlvarez',
      email: 'jeresoft+2@gmail.com',
      phone: '6691210703',
    };

    await expect(addUser(null, user)).rejects.toThrowError(
      'User validation failed: password: Path `password` is required.',
    );
  });

  it('Should be returns a error', async () => {
    const user = {
      username: 'jeresoft',
      name: 'Joel',
      lastName: 'Alvarez Mexia',
      email: 'jeresoft+2@gmail.com',
      phone: '6691210703',
      password: 'cochiverde',
    };
    await expect(addUser(null, user)).rejects.toThrowError(
      'The username already exists!, try with another one',
    );
  });
});
