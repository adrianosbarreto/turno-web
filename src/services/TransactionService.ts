import axios from "@/plugins/axios";

export function getAllTransaction(account_id : number,  month: number, year: number): Promise<any> {
  return axios.post(`/transactions/type-filter?account_id=${account_id}&month=${month}&year=${year}`);
}
