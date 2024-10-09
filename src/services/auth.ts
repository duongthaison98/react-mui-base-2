import { Endpoints } from 'constants/endpoints';
import type { HttpResponse } from 'types/common';
import HttpClient from 'utils/HttpClient';

interface LoginParams {
  username: string;
  password: string;
}
interface LoginResponse {
  accessToken: string;
}
export const signIn = (params: LoginParams) => {
  return HttpClient.post<typeof params, HttpResponse<LoginResponse>>(
    Endpoints.auth.login,
    params
  );
};

export const signOut = () => {
  return HttpClient.get<null, HttpResponse>(Endpoints.auth.logout);
};
