/*
 * © 2024 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from 'InferenceSPA/components/Layout';

describe('Layout Component Tests', () => {
  test('Layout loads layout components.', () => {
    // Arrange
    render(<Layout>{}</Layout>);

    // Act
    const layoutContainer: HTMLElement = screen.getByTestId('layout-container')
    const layoutContentBox: HTMLElement = screen.getByTestId('layout-content-box')
    const layoutFooterBox: HTMLElement = screen.getByTestId('layout-footer-box')

    // Assert
    expect(layoutContainer).toBeInTheDocument;
    expect(layoutContentBox).toBeInTheDocument;
    expect(layoutFooterBox).toBeInTheDocument;
  });
});