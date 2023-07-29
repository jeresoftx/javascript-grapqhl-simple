const { add } = require('../src/index');

describe('test index', () => {
  test('add', () => {
    expect(add(1, 2)).toBe(3);
  });
});
