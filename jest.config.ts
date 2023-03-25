import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    silent: false,
    verbose: false,
    testPathIgnorePatterns: [
        "tests/functional",
    ],
    coverageProvider: 'v8',
    collectCoverage: true,
    collectCoverageFrom: [
        './src/**',
    ],
    coveragePathIgnorePatterns: [
        './src/views',
    ],
};

export default config;
