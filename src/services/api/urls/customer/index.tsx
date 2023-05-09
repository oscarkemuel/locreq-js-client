import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IPostCustomer, IPostCustomerPlace } from "./types";

export class CustomerAPI implements IRequestMethods {
  url = '/customers'

  post(data: IPostCustomer) {
    return axiosInstance.post(`${this.url}`, data)
  }

  places = {
    getAll: () => {
      return axiosInstance.get(`${this.url}/place`)
    },

    post: (data: IPostCustomerPlace) => {
      return axiosInstance.post(`${this.url}/place`, data)
    }
  }
}