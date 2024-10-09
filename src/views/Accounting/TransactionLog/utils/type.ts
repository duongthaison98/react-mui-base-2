export interface TransactionHistory {
  id: number;
  transactionId: number;
  transactionDate: string;
  documentType: number;
  document: string;
  type: number;
  amount: number;
  operator: string;
  actionType: number;
}
