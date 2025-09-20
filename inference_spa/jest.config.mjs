/*
 * © 2024 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import nextJest from 'next/jest.js'

// Create a Next.js Jest config.
const createJestConfig = nextJest({
  dir: './',
})

// Add additional Jest config.
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
}

// Export the combined Jest config.
export default createJestConfig(config)