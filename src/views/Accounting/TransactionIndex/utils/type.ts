export interface Account {
  id: number;
  info: string;
}

export interface Entry {
  id: number;
  transactionId: number;
  date: string;
  type: number;
  object: Account;
  document: number;
  amount: number;
  debt: number;
  got: number;
  note: string;
  file: string;
}
