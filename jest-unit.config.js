const { resolve } = require('path');

const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: 'test',
  testRegex: '/__tests__/unit/.*\\.test\\.(js|ts)$',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^mongoose$': '<rootDir>/node_modules/mongoose',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/unit/bootstrap.js'],
};
