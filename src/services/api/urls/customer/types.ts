import { IUser } from "../auth/types";
import { IAddress, IProduct } from "../seller/types";

export type IPostCustomer = {
  phone: string;
}

export type IPostCustomerPlace = {
  name: string;
  address: IAddress;
}

export type IPlace = {
  id: string;
  name: string;
  address: IAddress;
}

export type IGetAllPlacesResponse = {
  places: IPlace[];
}

export type IGetPlaceResponse = {
  place: IPlace;
}

export type IStatus = 'pending' | 'accepted' | 'rejected' | 'delivered' | 'canceled'

export type IDeliveryRequest = {
  id: string;
  quantity: number;
  delivery_time: string;
  status: IStatus;
  placeId: string;
  sellerId: string;
  customerId: string;
  productId: string;
  place?: IPlace;
  seller?: {
    id: string;
    phone: string;
    userId: string;
    addressId: string;
    user: IUser;
  }
  customer?: {
    id: string;
    phone: string;
    userId: string;
    user: IUser;
    
  }
  Product?: IProduct;
}

export type IGetAllDeliveryRequestsResponse = {
  deliveryRequests: IDeliveryRequest[];
}

export type Seller = {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export type SellerWithAddress = {
  seller: Seller;
  address: IAddress;
}

export type IGetSearchSellersResponse = {
  sellers: SellerWithAddress[]
}

export type IPostDeliveryRequest = {
  quantity: number;
  placeId: string;
  productId: string;
}

export type IPostFeedbackSeller = {
  rating: number;
  comment: string;
  sellerId: string;
}

export type IGetCustomerHasFeedbackReponse = {
  hasFeedback: boolean;
}