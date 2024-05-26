const baseDir = '<rootDir>/src/data_handlers';
const baseTestDir = '<rootDir>/src/tests';

const config = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.js`],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
};

module.exports = config;
