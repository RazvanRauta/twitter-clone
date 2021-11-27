import React, { ReactElement } from 'react';

import styles from './styles.module.css';

import NextImage from '../NextImage';

export default function SideBar(): ReactElement {
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
    </div>
  );
}
