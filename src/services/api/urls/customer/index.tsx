import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IPostCustomer } from "./types";

export class CustomerAPI implements IRequestMethods {
  url = '/customers'

  post(data: IPostCustomer) {
    return axiosInstance.post(`${this.url}`, data)
  }
}