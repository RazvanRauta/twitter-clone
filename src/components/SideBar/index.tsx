/**
 *  @author: Razvan Rauta
 *  Date: Nov 27 2021
 *  Time: 18:48
 */

import noop from 'lodash/noop';
import React, { ReactElement } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

import styles from './styles.module.css';

import NextImage from '../NextImage';
import SideBarLink from '../SideBarLink';

interface ISideBarProps {
  sideBarLinks: SideBarLinks;
}

export default function SideBar({ sideBarLinks }: ISideBarProps): ReactElement {
  return (
    <div className={styles['side-bar-container']}>
      <div className={styles['logo-container']}>
        <NextImage
          src='https://rb.gy/ogau5a'
          alt='Logo'
          width={30}
          height={30}
          useSkeleton
          imgClassName='bg-transparent'
        />
      </div>
      <div className={styles['side-bar-links-container']}>
        {sideBarLinks &&
          sideBarLinks.map((link) => (
            <SideBarLink
              key={link.text}
              active={link.text.toLowerCase() === 'home'}
              {...link}
            />
          ))}
      </div>
      <button className={styles['tweet-button']}>Tweet</button>
      <div className={styles['profile-details-container']} onClick={() => noop}>
        <NextImage
          src={'https://avatars0.githubusercontent.com/u/40596596?v=4'}
          alt='User Image'
          useSkeleton
          className='my-3 xl:mr-2.5'
          imgClassName='h-10 w-10 rounded-full'
          width={40}
          height={40}
        />
        <div className='hidden leading-5 xl:inline'>
          <h4 className='font-bold'>Username</h4>
          <p className='text-[#6e767d]'>@user-tag</p>
        </div>
        <HiOutlineDotsHorizontal className='hidden h-5 ml-10 xl:inline' />
      </div>
    </div>
  );
}
