/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 13:06
 */

import type { NextComponentType, NextPageContext } from 'next';
import type { Router } from 'next/router';
import type { Session } from 'next-auth';

/**
 * * Enable custom page props
 */

declare module 'next/app' {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, unknown, P> & {
      requireAuth?: boolean;
    };
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session;
    };
  };
}
