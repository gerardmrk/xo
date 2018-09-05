module.exports = {
  notify: !!!process.env.CI,
  verbose: false,
  rootDir: "./../../",
  roots: ["<rootDir>/src"],
  setupTestFrameworkScriptFile: "jest-enzyme",
  testEnvironment: "enzyme",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "@client/(.*)\\?noembed$": "<rootDir>/src/client/$1",
    "@client/(.*)$": "<rootDir>/src/client/$1",
    "@renderer/(.*)$": "<rootDir>/src/renderer/$1",
    "@translations/(.*)$": "<rootDir>/config/i18n/translations/$1"
  }
};
