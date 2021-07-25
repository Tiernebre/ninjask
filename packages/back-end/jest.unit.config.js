const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "!**/?(*.int.)+(spec|test).[jt]s?(x)",
  ],
};
