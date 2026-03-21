'use client';

import { useRedirect } from '@/hooks';
import { usePrivileges } from '@/hooks/usePrivileges';
import type { Permission, UserRole } from '@/redux/slice/user';
import { type ReactNode, useEffect } from 'react';

interface RouteGuardProps {
  children: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
  roles?: UserRole[];
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

function RouteGuard({
  children,
  redirectTo = '/login',
  requireAuth = false,
  roles,
  permissions,
  requireAll = false,
  fallback = null,
}: RouteGuardProps) {
  const { isLoggedIn, hasRole, hasAnyPermission, hasAllPermissions } =
    usePrivileges();
  const { redirect } = useRedirect();

  const isAuthBlocked = requireAuth && !isLoggedIn;
  const isRoleBlocked = !!roles && roles.length > 0 && !hasRole(roles);
  const isPermissionBlocked = (() => {
    if (!permissions || permissions.length === 0) return false;
    const granted = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
    return !granted;
  })();

  const shouldRedirect = isAuthBlocked || isRoleBlocked || isPermissionBlocked;

  useEffect(() => {
    if (shouldRedirect) {
      redirect({ url: redirectTo });
    }
  }, [shouldRedirect, redirectTo, redirect]);

  if (shouldRedirect) return fallback;

  return <>{children}</>;
}

export default RouteGuard;
