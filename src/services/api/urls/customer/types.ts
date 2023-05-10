import { IAddress } from "../seller/types";

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