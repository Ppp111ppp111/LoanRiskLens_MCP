module.exports = {
  rootDir: __dirname,
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleNameMapper: {
    '^shared/(.*)$': '<rootDir>/../shared/src/$1',
    '^../../credit-engine/src/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  verbose: true,
};