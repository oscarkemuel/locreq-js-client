import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IGetAllPlacesResponse, IGetPlaceResponse, IPostCustomer, IPostCustomerPlace } from "./types";

export class CustomerAPI implements IRequestMethods {
  url = '/customers'

  post(data: IPostCustomer) {
    return axiosInstance.post(`${this.url}`, data)
  }

  places = {
    getAll: () => {
      return axiosInstance.get<IGetAllPlacesResponse>(`${this.url}/place`)
    },

    get: (id: string) => {
      return axiosInstance.get<IGetPlaceResponse>(`${this.url}/place/${id}`)
    },

    post: (data: IPostCustomerPlace) => {
      return axiosInstance.post(`${this.url}/place`, data)
    },

    put: (id: string, data: IPostCustomerPlace) => {
      return axiosInstance.put(`${this.url}/place/${id}`, data)
    },

    delete: (id: string) => {
      return axiosInstance.delete(`${this.url}/place/${id}`)
    }
  }
}