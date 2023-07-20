import { IUser } from "../auth/types";
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
  model: string;
  available: boolean;
}

export type IPostProduct = {
  name: string;
  description: string;
  model: string;
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

export type IFeedbackSeller = {
  id: string;
  comment?: string;
  rating: number;
  customerId: string;
  sellerId: string;
  customer: {
    phone: string;
    user: IUser;
  }
}

export type ISellerPerfil = {
  user: IUser;
  userId: string;
  phone: string;
  id: string;
  FeedbackSeller: IFeedbackSeller[];
  address: IAddress;
  Favorite: {
    id: string;
    customerId: string;
    customer: {
      userId: string;
    }
  }[];
}

export type IGetSellerPerfil = {
  seller: ISellerPerfil
}

export type ISeller = {
  id: string;
  phone: string;
  userId: string;
  addressId: string;
}

export type IGetMeResponse = {
  seller: ISeller;
}