const { getApolloServer } = require('../../../../src/graphql/server');
const { mutationAddUserId } = require('./features/mutation/mutation.addUserId');
const { newUser } = require('./features/newUser');
const { queryUser } = require('./features/query/query.user');

describe('Read a User', () => {
  it('returns a user', async () => {
    const testServer = await getApolloServer();

    const user = await testServer.executeOperation({
      query: mutationAddUserId,
      variables: newUser,
    });

    const response = await testServer.executeOperation({
      query: queryUser,
      variables: { id: user.data.addUser.id },
    });
    const expectData = {
      fullName: `${newUser.name} ${newUser.lastName}`,
    };
    expect(response.errors).toBeUndefined();
    expect(response.data?.user).toMatchObject(expectData);
  });
});
