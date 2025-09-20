/*
 * © 2024 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Layout from 'InferenceSPA/components/Layout';

describe('Layout Component Tests', () => {
  test('Layout loads layout components.', async () => {
    // Arrange
    render(<Layout><div>Test content</div></Layout>);

    // Act
    const layoutContainer: HTMLElement = screen.getByTestId('layout-container')
    const layoutContentBox: HTMLElement = screen.getByTestId('layout-content-box')
    const layoutFooterBox: HTMLElement = screen.getByTestId('layout-footer-box')

    // Assert
    await waitFor(() => {
      expect(layoutContainer).toBeInTheDocument;
      expect(layoutContentBox).toBeInTheDocument;
      expect(layoutFooterBox).toBeInTheDocument;
    });
  });
});