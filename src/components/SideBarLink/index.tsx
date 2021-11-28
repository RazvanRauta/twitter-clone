/**
 *  @author: Razvan Rauta
 *  Date: Nov 28 2021
 *  Time: 16:32
 */

import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import styles from './styles.module.css';

interface ISideBarLinkProps {
  active?: boolean;
}

export default function SideBarLink({
  Icon,
  text,
  active,
}: ISideBarLinkProps & ISideBarLink): ReactElement {
  const router = useRouter();
  return (
    <div
      className={clsx(styles['side-bar-link'], active && styles.active)}
      onClick={() => active && router.push('/')}
    >
      <Icon className='h-7' />
      <span className='hidden xl:inline'>{text}</span>
    </div>
  );
}
