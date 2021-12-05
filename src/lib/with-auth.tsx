/**
 *  @author: Razvan Rauta
 *  Date: Dec 03 2021
 *  Time: 18:25
 */

import type { ComponentType } from 'react';

/**
 * Enables auth for Next Page Component
 *
 * @param WrappedComponent
 * @returns Component with requireAuth = true
 */
export function withAuth<T>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithAuth = (props: T) => <WrappedComponent {...props} />;

  ComponentWithAuth.requireAuth = true;

  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
}
