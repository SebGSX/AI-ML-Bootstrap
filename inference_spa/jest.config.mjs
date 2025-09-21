/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import nextJest from 'next/jest.js'

// Create a Next.js Jest config.
const createJestConfig = nextJest({
    dir: './',
})

// Add additional Jest config.
const config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
}

// Export the combined Jest config.
export default createJestConfig(config)
