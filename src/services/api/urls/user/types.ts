import { IUser } from "../auth/types";

export type IPostUser = {
    name: string;
    email: string;
    password: string;
}

export type IPostUserResponse = {
  user: IUser
}