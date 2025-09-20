/*
 * © 2024 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import * as React from 'react';
import Head from 'next/head'
import Chat from 'InferenceSPA/components/Chat';

/**
 * The index page.
 * @returns A JSX.Element representing the index page.
 */
export default function Index(): JSX.Element {
  return (
    <>
      <Head>
        <title>Chatbot</title>
      </Head>
      <Chat></Chat>
    </>
  );
}