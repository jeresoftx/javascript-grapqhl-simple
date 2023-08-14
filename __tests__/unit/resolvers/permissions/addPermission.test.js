const {
  addPermission,
} = require('../../../../src/graphql/resolvers/permissions/addPermission');

describe('Add permission unit test', () => {
  it('returns a new permission', async () => {
    const permission = {
      name: 'createTodo',
      description: 'create a todo',
    };
    const response = await addPermission(null, permission);

    const expectData = {
      id: expect.any(String),
      name: permission.name,
      description: permission.description,
    };

    expect(response).toMatchObject(expectData);
  });
});
