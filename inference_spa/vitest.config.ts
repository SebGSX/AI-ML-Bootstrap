/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: {
        alias: {
            'InferenceSPA': '/src',
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
    },
})
