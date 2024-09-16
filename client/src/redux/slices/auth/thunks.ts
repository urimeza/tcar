import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, BackendUserForSignUp, LoginForm } from '../../../types/auth';
import authService from '@/services/auth/authService';

export const loginThunk = createAsyncThunk<AuthState, LoginForm>('auth/loginThunk', (formData) =>
  authService.login(formData),
);

export const signUpThunk = createAsyncThunk<AuthState, BackendUserForSignUp>(
  'auth/signUpThunk',
  (formData) => authService.signUp(formData),
);

export const refreshAuth = createAsyncThunk<AuthState>('auth/refreshAuth', () =>
  authService.refresh(),
);

export const logoutAuthThunk = createAsyncThunk<Promise<void>>('auth/logout', () =>
  authService.logout(),
);