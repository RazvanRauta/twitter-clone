/**
 *  @author: Razvan Rauta
 *  Date: Nov 28 2021
 *  Time: 20:37
 */
import type { ReactElement } from 'react';
import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';

import styles from './styles.module.css';

import { useGetAllTweetsQuery } from '@/service/tweet-api';

import AddTweet from '../AddTweet';
import Post from '../Post';
import Spinner from '../Spinner';

import type { ApiErrorResponse, TweetWithUserAndCount } from '@/types';

export default function Feed(): ReactElement {
  const { data, isLoading, error } = useGetAllTweetsQuery();
  let posts: TweetWithUserAndCount[] = [];
  let errorMsj = '';

  if (data && 'data' in data && data.data) {
    posts = data.data;
  }

  if (error && 'data' in error) {
    const { data: datum } = error;
    const err = datum as ApiErrorResponse;
    errorMsj = err && 'error' in err ? err.error : 'Ups! Error...';
  }

  return (
    <div className={styles['feed-container']}>
      <div className={styles['home-container']}>
        <h2 className={styles['home-title']}>Home</h2>
        <div className={styles['sparkles-container']}>
          <HiOutlineSparkles size={'20px'} className='text-white' />
        </div>
      </div>

      <AddTweet />
      <div className='pb-72'>
        {isLoading && <Spinner />}
        {posts &&
          posts.map((post) => <Post key={post.id} id={post.id} post={post} />)}
        {errorMsj && !isLoading && (
          <div className='flex items-center justify-center w-full h-28'>
            <p className='text-yellow-300'>{errorMsj}</p>
          </div>
        )}
      </div>
    </div>
  );
}
