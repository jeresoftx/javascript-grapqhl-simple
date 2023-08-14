const { resolve } = require('path');

const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: 'integration',
  testRegex: '/__tests__/integration/.*\\.test\\.(js|ts)$',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^mongoose$': '<rootDir>/node_modules/mongoose',
  },
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 10,
      functions: 50,
      lines: 50,
    },
  },
};
