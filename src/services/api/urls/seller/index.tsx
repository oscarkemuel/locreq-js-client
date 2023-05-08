import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IPostSeller } from "./types";

export class SellerAPI implements IRequestMethods {
  url = '/sellers'

  post(data: IPostSeller) {
    return axiosInstance.post(`${this.url}`, data)
  }
}