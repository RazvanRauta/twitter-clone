/**
 *  @author: Razvan Rauta
 *  Date: Nov 29 2021
 *  Time: 21:29
 */

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import '@/styles/globals.css';

import { AuthGuard } from '@/components/AuthGuard';

import { store } from '@/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
