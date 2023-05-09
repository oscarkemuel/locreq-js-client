import { IAddress } from "../seller/types";

export type IPostCustomer = {
  phone: string;
}

export type IPostCustomerPlace = {
  name: string;
  address: IAddress;
}