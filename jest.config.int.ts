/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  modulePaths: ['<rootDir>'],
  testRegex: '\\.(int|integrations)\\.test\\.ts$',
  testTimeout: 8 * 1000,
  maxWorkers: 1,
  globalSetup: './src/testing/global-setup.ts',
  globalTeardown: './src/testing/global-teardown.ts',
};
