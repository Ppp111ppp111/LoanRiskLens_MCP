module.exports = {
  rootDir: __dirname,
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleNameMapper: {
    '^shared/(.*)$': '<rootDir>/../../shared/src/$1',
    '^../../../credit-engine/src/(.*)$': '<rootDir>/../../credit-engine/src/$1',
    '^@/(.*)$': '<rootDir>/../../shared/src/$1',
  },
  testEnvironment: 'node',
  verbose: true,
};

