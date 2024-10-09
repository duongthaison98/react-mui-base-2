export interface Customer {
  id: number | string;
  customer: string;
  address: string;
  typeCustomer: string;
  phoneNumber: string | null;
  email: string | null;
  birthDay: Date | null;
  level: string | null;
  group: string | null;
  totalMoney: number;
  point: number | null;
  numberPurchase: number | null;
  daysPurchase: number | null;
  daysNotPurchase: number | null;
  lastDatePurchase: Date | null;
  amount: number | null;
  note: string | null;
  buyingCycle: string | number | null;
  store : string | null;
  [key: string]: any;
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
