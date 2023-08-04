const { getApolloServer } = require('../../../../src/graphql/server');
const { mutationAddUser } = require('./features/mutation/mutation.addUser');
const { newUser } = require('./features/newUser');
const { queryUsers } = require('./features/query/query.users');

describe('User list', () => {
  it('returns a users list', async () => {
    const testServer = await getApolloServer();

    await testServer.executeOperation({
      query: mutationAddUser,
      variables: newUser,
    });

    const response = await testServer.executeOperation({
      query: queryUsers,
      variables: { params: {} },
    });
    const expectData = [
      {
        fullName: `${newUser.name} ${newUser.lastName}`,
      },
    ];

    expect(response.errors).toBeUndefined();
    expect(response.data?.users).toMatchObject(expectData);
  });
});
