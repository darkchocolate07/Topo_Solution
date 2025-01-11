export default {
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Use Babel for transpiling ES modules
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        'chart.js': '<rootDir>/__mocks__/chart.js' // Map chart.js to the mock file
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)" // Transform node-fetch and its dependencies
    ],
  };
  