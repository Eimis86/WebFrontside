module.exports = {
    verbose: true,
    globals: {
        'ts-jest': {
            tsconfig: {
                allowJs: true
            }
        }
    },
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'ts-jest'
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(lodash-es)/)'
    ],
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.ts?(x)',
        '!**/__tests__/**/test-utils/*.ts?(x)',
        '**/?(*.)+(spec|test).ts?(x)'
    ],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '^.+\\.(svg|png)$': '<rootDir>/__mocks__/file.js',
        '^.+\\.(css|scss)': '<rootDir>/__mocks__/style.js',
    },
    setupFiles: ['<rootDir>/jestSetup.ts'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!**/__tests__/**',
    ],
    coverageDirectory: '<rootDir>/reports/coverage',
    coverageReporters: [ 'html' ],
};
