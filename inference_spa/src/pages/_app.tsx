/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from 'InferenceSPA/components/Layout';

// The theme for the app.
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

/**
 * Renders the app component that wraps the app's pages.
 * @param props An AppProps representing the props for the app.
 * @returns A JSX.Element representing the rendered component.
 */
export default function InferenceSpaApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}
