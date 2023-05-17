import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IGetAllProducts, IGetProduct, IPostProduct, IPostSeller } from "./types";

export class SellerAPI implements IRequestMethods {
  url = '/sellers'

  post(data: IPostSeller) {
    return axiosInstance.post(`${this.url}`, data)
  }

  products = {
    getAll: () => {
      return axiosInstance.get<IGetAllProducts>(`${this.url}/products`)
    },

    get: (id: string) => {
      return axiosInstance.get<IGetProduct>(`${this.url}/products/${id}`)
    },

    post: (data: IPostProduct) => {
      return axiosInstance.post(`${this.url}/products`, data)
    },

    put: (id: string, data: IPostProduct) => {
      return axiosInstance.put(`${this.url}/products/${id}`, data)
    },

    delete: (id: string) => {
      return axiosInstance.delete(`${this.url}/products/${id}`)
    },

    getBySeller: (id: string) => {
      return axiosInstance.get<IGetAllProducts>(`${this.url}/${id}/products`)
    }
  }
}