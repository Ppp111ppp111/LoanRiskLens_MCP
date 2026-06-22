module.exports = {
  rootDir: __dirname,
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleNameMapper: {
    '^shared/(.*)$': '<rootDishared/$1',
    '^shared/(.*)$': '<rootDishared/$1',
    '^../../../credit-engine/src/(.*)$': '<rootDir>/../../credit-engine/src/$1',
    '^@/(.*)$': '<rootDishared/$1',
  },
  testEnvironment: 'node',
  verbose: true,
};