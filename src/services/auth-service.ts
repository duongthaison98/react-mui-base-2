import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
} from '@/types/auth';
import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';

const prefix = 'auth';

export const signIn = (params: LoginRequest) => {
  return HttpClient.post<typeof params, HttpResponse<LoginResponse>>(`${prefix}/login`, params);
};

export const signUp = (params: LoginRequest) => {
  return HttpClient.post(`${prefix}/signup`, params);
};

export const signOut = () => {
  return HttpClient.get<null, HttpResponse>(`${prefix}/logout`);
};

export const verifyEmail = (params: VerifyEmailRequest) => {
  return HttpClient.post<VerifyEmailRequest, HttpResponse<ResetPasswordResponse>>(
    `${prefix}/verify-email`,
    params,
  );
};

export const resetPassword = (params: ResetPasswordRequest) => {
  return HttpClient.post<ResetPasswordRequest, HttpResponse<ResetPasswordResponse>>(
    `${prefix}/reset-password`,
    params,
  );
};

export const forgotPassword = (params: ForgotPasswordRequest) => {
  return HttpClient.post<ForgotPasswordRequest, HttpResponse<ResetPasswordResponse>>(
    `${prefix}/forgot-password`,
    params,
  );
};
