const { getApolloServer } = require('../../../../src/graphql/server');
const { mutationAddUser } = require('./features/mutation/mutation.addUser');
const { newUser } = require('./features/newUser');

describe('Create user', () => {
  it('add a user', async () => {
    const testServer = await getApolloServer();

    const response = await testServer.executeOperation({
      query: mutationAddUser,
      variables: newUser,
    });
    const expectData = {
      addUser: {
        fullName: `${newUser.name} ${newUser.lastName}`,
      },
    };
    expect(response.errors).toBeUndefined();
    expect(response.data).toMatchObject(expectData);
  });
});
