/**
 *  @author: Razvan Rauta
 *  Date: Nov 29 2021
 *  Time: 21:29
 */

import type { AppProps as NextAppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';

import { ICustomSession } from '@/types';

/**
 * * Enable custom page props
 */
type AppProps<P = Record<string, unknown>> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

type CustomPageProps = {
  session?: ICustomSession;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<CustomPageProps>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
