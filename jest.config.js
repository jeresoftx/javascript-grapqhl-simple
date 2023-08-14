const { resolve } = require('path');

const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  projects: [
    '<rootDir>/jest-unit.config.js',
    '<rootDir>/jest-integration.config.js',
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'html'],
  testEnvironment: 'node',
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
