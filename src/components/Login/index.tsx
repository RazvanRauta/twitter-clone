/**
 *  @author: Razvan Rauta
 *  Date: Nov 29 2021
 *  Time: 18:28
 */

import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import type { ReactElement } from 'react';
import React from 'react';

import styles from './styles.module.css';

import NextImage from '../NextImage';

type LoginProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const Login = ({ providers }: LoginProps): ReactElement => {
  return (
    <div className={styles['login-container']}>
      <NextImage
        src='https://rb.gy/ogau5a'
        width={150}
        height={150}
        objectFit='contain'
        alt='Logo'
      />

      <div>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {/* https://devdojo.com/tailwindcss/buttons#_ */}
              <button
                className={styles['google-sign-in']}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                <span className={styles['button-styles-first']}></span>
                <span className={styles['button-styles-second']}>
                  Sign in with {provider.name}
                </span>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
