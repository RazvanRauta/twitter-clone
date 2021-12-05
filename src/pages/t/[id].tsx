/**
 *  @author: Razvan Rauta
 *  Date: Nov 30 2021
 *  Time: 12:07
 */

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import React from 'react';
import { HiArrowLeft as ArrowLeftIcon } from 'react-icons/hi';

import { useAppSelector } from '@/lib/store-hooks';
import { withAuth } from '@/lib/with-auth';

import Comment from '@/components/Comment';
import Layout from '@/components/layout/Layout';
import Modal from '@/components/Modal';
import Post from '@/components/Post';
import Seo from '@/components/Seo';
import SideBar from '@/components/SideBar';
import Spinner from '@/components/Spinner';
import { Widgets } from '@/components/Widgets';

import { sideBarLinks } from '@/constants';
import { useGetTweetQuery } from '@/service/tweet-api';
import { isModalOpen } from '@/store/modal/modalSlice';

import type {
  ApiErrorResponse,
  FollowerResults,
  TrendingResults,
  TweetWithCommentsAndCount,
} from '@/types';

function Tweet({
  followResults,
  trendingResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const router = useRouter();
  const isOpen = useAppSelector(isModalOpen);
  const { id } = router.query;
  let post: TweetWithCommentsAndCount | null = null;
  let errorMsj = '';

  const { data, isLoading, error } = useGetTweetQuery(id as string);

  if (!isLoading && data && data.success) {
    if ('id' in data.data) {
      post = data.data;
    }
  }

  if (!isLoading && error && 'data' in error) {
    const { data: datum } = error;
    const err = datum as ApiErrorResponse;
    errorMsj = err && 'error' in err ? err.error : 'Ups! Error...';
  }

  if (!post) {
    return <p>No post</p>;
  }

  return (
    <Layout>
      <Seo templateTitle={`${post?.user?.name} on Twitter: "${post?.text}""`} />
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
          {isLoading && <Spinner />}
          <Post id={`${id}`} post={post} postPage />
          {post && post?.comments && post?.comments?.length > 0 && (
            <div className='pb-72'>
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
          {errorMsj && !isLoading && (
            <div className='flex items-center justify-center w-full h-28'>
              <p className='text-yellow-300'>{errorMsj}</p>
            </div>
          )}
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </Layout>
  );
}

export default withAuth(Tweet);

type GetServerSideCustomProps = {
  trendingResults: TrendingResults;
  followResults: FollowerResults;
};

export const getServerSideProps: GetServerSideProps<
  GetServerSideCustomProps
> = async (context) => {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  );
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  );
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      session,
    },
  };
};
