module.exports = {
  projects: [
    {
      displayName: 'shared',
      testMatch: ['<rootDir>/shared/tests/**/*.test.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/shared/src/$1'
      },
    },
    {
      displayName: 'credit-engine',
      testMatch: ['<rootDir>/credit-engine/tests/**/*.test.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/shared/src/$1',
        '../../shared/src/config': '<rootDir>/shared/src/config',
        '../../shared/src/utils/helpers': '<rootDir>/shared/src/utils/helpers',
      },
    },
    {
      displayName: 'apps-api',
      testMatch: ['<rootDir>/apps/api/tests/**/*.test.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/shared/src/$1',
        '../../../shared/src/(.*)$': '<rootDir>/shared/src/$1',
        '../../../credit-engine/src/(.*)$': '<rootDir>/credit-engine/src/$1',
      },
    },
  ],
  testEnvironment: 'node',
  verbose: true,
};
