import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IPostUserResponse } from "./types";
import { IPostUser } from "./types";

export class UserAPI implements IRequestMethods {
  url = "/users";

  post(data: IPostUser) {
    return axiosInstance.post<IPostUserResponse>(`${this.url}`, data);
  }
}
