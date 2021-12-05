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

import Layout from '@/components/layout/Layout';
import { Login } from '@/components/Login';
import Seo from '@/components/Seo';

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

  return (
    <Layout>
      <Seo templateTitle='Sign In' />
      <Login providers={providers} />{' '}
    </Layout>
  );
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
