/**
 *  @author: Razvan Rauta
 *  Date: Nov 28 2021
 *  Time: 20:37
 */
import type { QueryDocumentSnapshot } from '@firebase/firestore';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';

import styles from './styles.module.css';

import { db } from '@/lib/firebase';

import AddTweet from '../AddTweet';
import Post from '../Post';

import type { ITweet } from '@/types';

export default function Feed(): ReactElement {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<ITweet>[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          const tweets = snapshot.docs as QueryDocumentSnapshot<ITweet>[];
          setPosts(tweets);
        }
      ),
    []
  );

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
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}
