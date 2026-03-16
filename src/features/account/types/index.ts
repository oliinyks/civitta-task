export type Transaction = {
  name: string;
  bank: string;
  time: string;
  amount: number;
};

export type Account = {
  accountType: string;
  accountNumber: string;
  availableBalance: number;
  currency: string;
  dateAdded: string;
  transactions: Transaction[];
};

