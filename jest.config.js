module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    roots: ["<rootDir>"],
    preset: "ts-jest",
    testMatch: ["**/?(*.)test.ts?(x)"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/$1",
    },
};
