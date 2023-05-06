import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IPostLogin, IPostLoginResponse } from "./types";

export class AuthAPI implements IRequestMethods {
  url = '/auth'

  login(data: IPostLogin) {
    return axiosInstance.post<IPostLoginResponse>(`${this.url}`, data)
  }
}