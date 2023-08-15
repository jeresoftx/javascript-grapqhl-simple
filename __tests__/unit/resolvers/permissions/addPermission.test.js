const {
  addPermission,
} = require('../../../../src/graphql/resolvers/permissions/addPermission');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Add permission unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const permission = {
      name: 'createTodo',
      description: 'create a todo',
    };
    const response = addPermission(null, permission);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a new permission', async () => {
    isAuthorized.mockReturnValue(true);
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
