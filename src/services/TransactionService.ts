import axios from "@/plugins/axios";
import {Transaction} from "@/types/Transaction";

export function getTransactionByType(account_id : number,  type: string | null, month: number, year: number): Promise<any> {
  let url = `/transactions/type-filter?account_id=${account_id}&month=${month}&year=${year}`;

  if (type !== null) {
    url += `&type=${type}`;
  }

  return axios.post(url);
}

export function createPurchase(transaction: Partial<Transaction>): Promise<any> {
  return axios.post('/transactions', transaction);
}

export function createIncome(transaction: Partial<Transaction>): Promise<any> {
  return axios.post('/transactions', transaction);
}
