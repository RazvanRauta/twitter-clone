/**
 *  @author: Razvan Rauta
 *  Date: Nov 27 2021
 *  Time: 18:48
 */

import React, { ReactElement } from 'react';

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
    </div>
  );
}
