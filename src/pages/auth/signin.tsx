/**
 *  @author: Razvan Rauta
 *  Date: Dec 03 2021
 *  Time: 16:03
 */

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { getProviders } from 'next-auth/react';
import type { ReactElement } from 'react';
import { useEffect } from 'react';

import { Login } from '@/components/Login';

export default function SignInPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [router, session]);

  return <Login providers={providers} />;
}

type GetServerSideCustomProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};
export const getServerSideProps: GetServerSideProps<
  GetServerSideCustomProps
> = async (ctx) => {
  const providers = await getProviders();
  const session = await getSession(ctx);

  return {
    props: {
      providers,
      session,
    },
  };
};
