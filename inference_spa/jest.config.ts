/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

/** @jest-config-loader ts-node */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const config: Config = {
    testEnvironment: 'jsdom',
};

export default createJestConfig(config);
