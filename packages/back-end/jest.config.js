module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.entity.ts",
    "!src/**/*.mock.ts",
    "!src/**/index.ts",
    "!src/**/*.middleware.ts",
    "!src/poke-api/**/*",
    "!src/app.ts",
    "!src/dependency-injection.ts",
  ],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
    },
  },
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: -10,
    },
  },
};
