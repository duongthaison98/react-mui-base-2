export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ResetPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type ForgotPasswordRequest = {
  password: string;
  token: string;
};

export type VerifyEmailRequest = {
  email: string;
};

export type ResetPasswordResponse = Promise<ApiResponse<string>>;
