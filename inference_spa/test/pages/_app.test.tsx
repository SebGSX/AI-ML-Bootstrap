/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import { AppProps } from 'next/app';
import '@testing-library/jest-dom';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import InferenceSpaApp from 'InferenceSPA/pages/_app';

/**
 * Tests that the _app page renders correctly.
 */
test('_app page renders correctly', () => {
    // Arrange
    const appProps: AppProps = {
        Component: () => <div>Test Component</div>,
        pageProps: {},
        router: vi.fn() as any,
    };

    // Act
    render(<InferenceSpaApp {...appProps} />);

    // Assert
    expect(screen.getByTestId('layout-container')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
});
