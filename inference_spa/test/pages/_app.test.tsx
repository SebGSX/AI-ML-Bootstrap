/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import * as React from 'react';
import { AppProps } from 'next/app';
import { render } from '@testing-library/react';
import InferenceSpaApp from 'InferenceSPA/pages/_app';
import { Router } from 'next/router';

describe('App Component Tests', () => {
  test('InferenceSpaApp renders.', () => {
    // Arrange
    const props: AppProps = {
      Component: () => <div></div>,
      pageProps: {},
      router: {} as Router
    };
    render(<InferenceSpaApp {...props} />);

    // Act & Assert
    expect(document.body).toBeInTheDocument;
  });
});