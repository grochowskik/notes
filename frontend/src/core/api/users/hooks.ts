import { usePost } from '@/core';
import {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from './types';

export const useLogin = () => {
  return usePost<LoginRequest, LoginResponse>('/login');
};

export const useRegister = () => {
  return usePost<RegisterUserRequest, RegisterUserResponse>('/users_create');
};
