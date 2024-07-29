const baseDir = '<rootDir>/src/data_handlers';

const config = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [`${baseDir}/**/*.js`],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  reporters: ['default', 'jest-html-reporters'],
};

module.exports = config;
