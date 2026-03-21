import {
  selectHasPermission,
  selectIsLoggedIn,
  selectPermissions,
  selectUserRole,
  type Permission,
  type UserRole,
} from '@/redux/slice/user';
import { useSelector } from 'react-redux';

export function usePrivileges() {
  const role = useSelector(selectUserRole);
  const permissions = useSelector(selectPermissions);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  function hasPermission(permission: Permission): boolean {
    return permissions.includes(permission);
  }

  function hasRole(requiredRole: UserRole | UserRole[]): boolean {
    if (!role) return false;
    return Array.isArray(requiredRole)
      ? requiredRole.includes(role)
      : role === requiredRole;
  }

  function hasAnyPermission(required: Permission[]): boolean {
    return required.some((p) => permissions.includes(p));
  }

  function hasAllPermissions(required: Permission[]): boolean {
    return required.every((p) => permissions.includes(p));
  }

  return {
    role,
    permissions,
    isLoggedIn,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
  };
}

export { selectHasPermission };
