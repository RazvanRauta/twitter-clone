/**
 *  @author: Razvan Rauta
 *  Date: Nov 27 2021
 *  Time: 18:12
 */

import type { ReactElement } from 'react';
import * as React from 'react';

import Feed from '@/components/Feed';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SideBar from '@/components/SideBar';

import { sideBarLinks } from '@/constants';

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <Seo />
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <SideBar sideBarLinks={[...sideBarLinks]} />
        <Feed />
      </main>
    </Layout>
  );
}
