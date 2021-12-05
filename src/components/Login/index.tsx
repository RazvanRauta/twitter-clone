/**
 *  @author: Razvan Rauta
 *  Date: Nov 29 2021
 *  Time: 18:28
 */

import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
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
            <div key={provider.name} className='pb-5'>
              {/* https://devdojo.com/tailwindcss/buttons#_ */}
              <button
                className='relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group'
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                <span className='w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
                <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
                  Sign in with {provider.name}
                </span>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
