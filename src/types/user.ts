export type IUser = {
  id: string;
  email: string;
  active: boolean;
  verifyEmailAt: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userDetail: any | null;
};
