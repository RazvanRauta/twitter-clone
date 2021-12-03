/**
 *  @author: Razvan Rauta
 *  Date: Dec 03 2021
 *  Time: 18:07
 */

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';

export function AuthGuard({
  children,
}: {
  children: ReactNode;
}): ReactElement | null {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [router, session]);

  if (session) {
    return <>{children}</>;
  }

  return null;
}
