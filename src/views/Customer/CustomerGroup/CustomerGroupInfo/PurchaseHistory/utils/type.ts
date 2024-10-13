export interface IPurchaseHistoryType {
  id: number;
  date: string;
  type: string;
  customer : string;
  products: string;
  price: number;
  quantity: number;
  discount: number;
  money: number;
  totalMoney?: number;
  note: string;
}
