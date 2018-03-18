export interface ICashStatement {
  balance: string;
  creditAmount: string;
  currency: string;
  debitAmount: string;
  description: string;
  id: number;
  label: string;
  name: string;
  transactionDate: string;
  valueDate: string;
  unclearedAmount?: any;
  transactionType?: any;
  transactionAmount?: any;
}
