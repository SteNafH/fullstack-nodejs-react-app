import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        root: '.',
        exclude: ['tests/functional', 'node_modules'],
        reporters: 'verbose',
        coverage: {
            provider: 'v8',
            reporter: ['lcov', 'html'],
        },
    },
});
