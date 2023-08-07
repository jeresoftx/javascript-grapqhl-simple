const { addPermission } = require('./addPermission');
const { connectDB, disconnectDB } = require('../../../db/connectDB');

describe('Add user unit test', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    disconnectDB();
  });

  it('returns a new user', async () => {
    const user = {
      name: 'createTodo',
      description: 'create a todo',
    };
    const response = await addPermission(null, user);

    const expectData = {
      id: expect.any(String),
      name: user.name,
      description: user.description,
    };

    expect(response).toMatchObject(expectData);
  });
});
