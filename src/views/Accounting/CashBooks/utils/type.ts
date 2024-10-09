export interface Cash {
  id: number;
  transactionId: number;
  date: string;
  type: number;
  account: string;
  contraAccount: string;
  object: string;
  document: string;
  receive: number;
  spend: number;
  creator: string;
  note: string;
  file: string;
}
