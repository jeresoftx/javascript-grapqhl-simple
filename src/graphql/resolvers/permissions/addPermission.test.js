const { addPermission } = require('./addPermission');
const { connectDB, disconnectDB } = require('../../../db/connectDB');

describe('Add permission unit test', () => {
  beforeAll(async () => {
    await connectDB({});
  });

  afterAll(async () => {
    await disconnectDB();
  });

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
