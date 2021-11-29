/**
 *  @author: Razvan Rauta
 *  Date: Nov 27 2021
 *  Time: 18:12
 */

import type { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  useSession,
} from 'next-auth/react';
import type { ReactElement } from 'react';
import * as React from 'react';

import Feed from '@/components/Feed';
import Layout from '@/components/layout/Layout';
import { Login } from '@/components/Login';
import Modal from '@/components/Modal';
import Seo from '@/components/Seo';
import SideBar from '@/components/SideBar';
import { Widgets } from '@/components/Widgets';

import { sideBarLinks } from '@/constants';

import type { FollowerResults, TrendingResults } from '@/types';

type HomePageProps = {
  trendingResults: TrendingResults;
  followResults: FollowerResults;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export default function HomePage({
  trendingResults,
  followResults,
  providers,
}: HomePageProps): ReactElement {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <Layout>
      <Seo />
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <SideBar sideBarLinks={[...sideBarLinks]} />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        <Modal />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  );
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
};
