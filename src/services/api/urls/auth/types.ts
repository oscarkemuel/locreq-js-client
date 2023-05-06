export type IUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
}

export type IPostLogin = {
  email: string;
  password: string;
}

export type IPostLoginResponse = {
  user: {
    user: IUser;
    token: string;
  }
}