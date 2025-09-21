/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from 'InferenceSPA/components/Layout';

/**
 * Tests that the Layout component renders correctly.
 */
test('Layout component renders correctly', () => {
    // Arrange
    const childText = 'Child Component';

    // Act
    render(
        <Layout>
            <div>{childText}</div>
        </Layout>
    );

    // Assert
    expect(screen.getByTestId('layout-container')).toBeInTheDocument();
    expect(screen.getByTestId('layout-content-box')).toBeInTheDocument();
    expect(screen.getByTestId('layout-footer-box')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Chatbot')).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
    expect(screen.getByText(/© 2025 Seb Garrioch. All rights reserved./)).toBeInTheDocument();
    expect(screen.getByText('MIT License')).toBeInTheDocument();
    expect(screen.getByText('MIT License').closest('a'))
        .toHaveAttribute('href', 'https://github.com/SebGSX/AI-ML-Bootstrap/blob/main/LICENSE');
});
