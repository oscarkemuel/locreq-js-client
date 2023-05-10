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

export type IDeliveryRequest = {
  id: string;
  quantity: number;
  delivery_time: string;
  status: 'pending' | 'accepted' | 'rejected' | 'delivered';
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
  }
  Product?: IProduct;
}

export type IGetAllDeliveryRequestsResponse = {
  deliveryRequests: IDeliveryRequest[];
}