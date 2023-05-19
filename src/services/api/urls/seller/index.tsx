import axiosInstance from "../../axios-instance";
import { IRequestMethods } from "../../request-methods";
import {
  IGetAllDeliveriesResponse,
  IGetAllProducts,
  IGetMeResponse,
  IGetProduct,
  IGetSellerPerfil,
  IPatchDeliveryStatus,
  IPostProduct,
  IPostSeller,
} from "./types";

export class SellerAPI implements IRequestMethods {
  url = "/sellers";

  post(data: IPostSeller) {
    return axiosInstance.post(`${this.url}`, data);
  }

  getMe(){
    return axiosInstance.get<IGetMeResponse>(`${this.url}/me`)
  }

  getPerfil(id: string) {
    return axiosInstance.get<IGetSellerPerfil>(`${this.url}/${id}/perfil`);
  }

  products = {
    getAll: () => {
      return axiosInstance.get<IGetAllProducts>(`${this.url}/products`);
    },

    get: (id: string) => {
      return axiosInstance.get<IGetProduct>(`${this.url}/products/${id}`);
    },

    post: (data: IPostProduct) => {
      return axiosInstance.post(`${this.url}/products`, data);
    },

    put: (id: string, data: IPostProduct) => {
      return axiosInstance.put(`${this.url}/products/${id}`, data);
    },

    delete: (id: string) => {
      return axiosInstance.delete(`${this.url}/products/${id}`);
    },

    getBySeller: (id: string) => {
      return axiosInstance.get<IGetAllProducts>(`${this.url}/${id}/products`);
    },
  };

  deliveryRequests = {
    getAll: () => {
      return axiosInstance.get<IGetAllDeliveriesResponse>(
        `/delivery-request/by-seller`
      );
    },

    updateStatus: (id: string, { status }: IPatchDeliveryStatus) => {
      return axiosInstance.patch(`/delivery-request/${id}/status/`, { status });
    },
  };
}
