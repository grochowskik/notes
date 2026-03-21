import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type UserRole = 'admin' | 'manager' | 'user' | 'guest';

export type Permission =
  | 'notes:read'
  | 'notes:write'
  | 'notes:delete'
  | 'settings:read'
  | 'settings:write'
  | 'users:read'
  | 'users:write';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'notes:read',
    'notes:write',
    'notes:delete',
    'settings:read',
    'settings:write',
    'users:read',
    'users:write',
  ],
  manager: [
    'notes:read',
    'notes:write',
    'notes:delete',
    'settings:read',
    'users:read',
  ],
  user: ['notes:read', 'notes:write'],
  guest: ['notes:read'],
};

interface UserState {
  loggedIn: boolean;
  lifetime: number | null;
  timestamp: number | null;
  role: UserRole | null;
  permissions: Permission[];
}

const initialState: UserState = {
  loggedIn: false,
  lifetime: null,
  timestamp: null,
  role: null,
  permissions: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.loggedIn = action.payload.isLoggedIn;
    },
    setLifetime(state, action: PayloadAction<{ lifetime: number }>) {
      state.lifetime = action.payload.lifetime;
    },
    setTimestamp(state) {
      state.timestamp = Date.now();
    },
    setRole(state, action: PayloadAction<UserRole>) {
      state.role = action.payload;
      state.permissions = ROLE_PERMISSIONS[action.payload];
    },
    setPermissions(state, action: PayloadAction<Permission[]>) {
      state.permissions = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {
  setLoggedIn,
  setLifetime,
  setTimestamp,
  setRole,
  setPermissions,
  clearUser,
} = userSlice.actions;

export const selectUserRole = (state: RootState) => state.user.role;
export const selectPermissions = (state: RootState) => state.user.permissions;
export const selectIsLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectHasPermission =
  (permission: Permission) =>
  (state: RootState): boolean =>
    state.user.permissions.includes(permission);

export default userSlice.reducer;
