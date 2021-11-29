/**
 *  @author: Razvan Rauta
 *  Date: Nov 28 2021
 *  Time: 20:37
 */
import type { ReactElement } from 'react';
import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';

import styles from './styles.module.css';

import AddTweet from '../AddTweet';

export default function Feed(): ReactElement {
  return (
    <div className={styles['feed-container']}>
      <div className={styles['home-container']}>
        <h2 className={styles['home-title']}>Home</h2>
        <div className={styles['sparkles-container']}>
          <HiOutlineSparkles className='h-5 text-white' />
        </div>
      </div>

      <AddTweet />
      <div className='pb-72'>
        <p>Posts here</p>
      </div>
    </div>
  );
}
