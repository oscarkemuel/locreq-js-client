import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import { IGetAllDeliveryRequestsResponse, IGetAllPlacesResponse, IGetPlaceResponse, IGetSearchSellersResponse, IPostCustomer, IPostCustomerPlace } from "./types";

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
    },

    searchSellers: (id: string) => {
      return axiosInstance.get<IGetSearchSellersResponse>(`${this.url}/place/${id}/nearby-sellers`)
    }
  }

  deliveryRequests = {
    getAll: () => {
      return axiosInstance.get<IGetAllDeliveryRequestsResponse>(`/delivery-request/my-requests`)
    },

    cancel: (id: string) => {
      return axiosInstance.put(`/delivery-request/cancel/${id}`, {})
    },

    getByPlace(id: string) {
      return axiosInstance.get<IGetAllDeliveryRequestsResponse>(`/delivery-request/place/${id}`)
    }
  }
}