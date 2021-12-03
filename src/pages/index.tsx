/**
 *  @author: Razvan Rauta
 *  Date: Nov 27 2021
 *  Time: 18:12
 */

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import React from 'react';

import { useAppSelector } from '@/lib/store-hooks';
import { withAuth } from '@/lib/with-auth';

import Feed from '@/components/Feed';
import Layout from '@/components/layout/Layout';
import Modal from '@/components/Modal';
import Seo from '@/components/Seo';
import SideBar from '@/components/SideBar';
import { Widgets } from '@/components/Widgets';

import { sideBarLinks } from '@/constants';
import { isModalOpen } from '@/store/modal/modalSlice';

import type { FollowerResults, TrendingResults } from '@/types';

function HomePage({
  trendingResults,
  followResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const isOpen = useAppSelector(isModalOpen);
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
        {isOpen && <Modal />}
      </main>
    </Layout>
  );
}

export default withAuth(HomePage);

type GetServerSideCustomProps = {
  trendingResults: TrendingResults;
  followResults: FollowerResults;
};

export const getServerSideProps: GetServerSideProps<
  GetServerSideCustomProps
> = async (context) => {
  const trendingResults: TrendingResults = await fetch(
    'https://jsonkeeper.com/b/NKEV'
  ).then((res) => res.json());
  const followResults: FollowerResults = await fetch(
    'https://jsonkeeper.com/b/WWMJ'
  ).then((res) => res.json());

  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      session,
    },
  };
};
