/**
 *  @author: Razvan Rauta
 *  Date: Nov 30 2021
 *  Time: 12:07
 */

import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  useSession,
} from 'next-auth/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { HiArrowLeft as ArrowLeftIcon } from 'react-icons/hi';

import { db } from '@/lib/firebase';

import Comment from '@/components/Comment';
import Layout from '@/components/layout/Layout';
import { Login } from '@/components/Login';
import Modal from '@/components/Modal';
import Post from '@/components/Post';
import Seo from '@/components/Seo';
import SideBar from '@/components/SideBar';
import { Widgets } from '@/components/Widgets';

import { sideBarLinks } from '@/constants';

import { FollowerResults, ITweet, TrendingResults } from '@/types';

interface TweetProps {
  trendingResults: TrendingResults;
  followResults: FollowerResults;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export default function Tweet({
  followResults,
  providers,
  trendingResults,
}: TweetProps): ReactElement {
  const { data: session } = useSession();
  const [post, setPost] = useState<ITweet>();
  const [comments, setComments] = useState<DocumentData[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', `${id}`), (snapshot) => {
        const post = snapshot.data() as ITweet;
        setPost(post);
      }),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', `${id}`, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  if (!session) return <Login providers={providers} />;

  return (
    <Layout>
      <Seo templateTitle={`${post?.username} on Twitter: "${post?.text}""`} />
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <SideBar sideBarLinks={[...sideBarLinks]} />
        <div className='flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
          <div className='flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black'>
            <div
              className='flex items-center justify-center hoverAnimation w-9 h-9 xl:px-0'
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon size='20px' className='text-white ' />
            </div>
            Tweet
          </div>

          <Post id={`${id}`} post={post} postPage />
          {comments.length > 0 && (
            <div className='pb-72'>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment.data()} />
              ))}
            </div>
          )}
        </div>
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
