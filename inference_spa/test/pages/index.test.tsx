/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Index from 'InferenceSPA/pages/index';

/**
 * Tests that the Index page renders correctly.
 */
test('Index page renders correctly', () => {
    // Act
    render(<Index />);

    // Assert
    expect(screen.getByTestId('chat-feed-box')).toBeInTheDocument();
});
