import { IDeliveryRequest, IStatus } from "../customer/types";

export type IAddress = {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export type IPostSeller = {
  phone: string;
}

export type IProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export type IPostProduct = {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export type IGetAllProducts = {
  products: IProduct[];
}

export type IGetProduct = {
  product: IProduct;
}

export type IPatchDeliveryStatus = {
  status: IStatus;
}

export type IGetAllDeliveriesResponse = {
  deliveryRequests: IDeliveryRequest[];
}