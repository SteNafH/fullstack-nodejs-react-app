module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    silent: false,
    verbose: false,
    testPathIgnorePatterns: [
        "tests/functional",
    ],
};