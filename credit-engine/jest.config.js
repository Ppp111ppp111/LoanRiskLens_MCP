module.exports = {
  rootDir: __dirname,
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleNameMapper: {
    '^shared/(.*)$': '<rootDishared/$1',
    '^../../credit-engine/src/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  verbose: true,
};