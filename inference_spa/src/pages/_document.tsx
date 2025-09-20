/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

/**
 * Renders the document component that wraps the app and its pages.
 * @param props A DocumentProps representing the props for the document.
 * @returns A JSX.Element representing the rendered component.
 */
export default function Document(props: DocumentProps): JSX.Element {
  return (
    <Html lang='en'>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-title' content='Chatbot' />
        <meta name='description' content='A bootstrap guide and project to get a curious developer up and running on artificial intelligence and machine learning.' />
      </Head>
      <body data-testid='body'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}