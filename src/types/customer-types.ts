import { PaginationParams } from "./common";
import { CustomerGroup } from "./customerGroup";

export enum CustomerType {
  CUSTOMER = 'CUSTOMER',
  AGENCY = 'AGENCY',
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  customerGroupId: string;
  customerType: CustomerType; 
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customerAddress: any[]; 
  customerServices: any[]; 
  customerGroup: CustomerGroup;
}
export interface CustomersRequest extends PaginationParams {
  filter? : {
    customerGroup : string;
    customerType : string;
  }
}

export interface ListCustomerResponse {
  items: Customer[];
  total: number;
  page: number;
  limit: number;
}

export interface PersonInCharge {
  id: number;
  fullName: string;
}

export interface CustomerDetails {
  address: string;
  createdAt: string;
  createdBy: string;
  dateOfBirth: null;
  email: string;
  fullName: string;
  gender: number;
  id: number;
  imageUrl: string;
  mobile: string;
  personInCharge: number | null;
  roles: [];
  status: number;
  updatedAt: string;
  updatedBy: string;
  userCode: string;
  username: string;
  feeRatio: string;
  shippingCostJpToVn: string;
  addess: string;
}
