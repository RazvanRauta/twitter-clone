/**
 *  @author: Razvan Rauta
 *  Date: Nov 29 2021
 *  Time: 18:28
 */

import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import type { ReactElement } from 'react';
import React from 'react';

type LoginProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const Login = ({ providers }: LoginProps): ReactElement => {
  if (!providers) {
    return <div></div>;
  }
  return <div></div>;
};
