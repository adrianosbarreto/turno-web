import axios from "@/plugins/axios";

export function getAllExpenses(account_id : number,  month: number, year: number): Promise<any> {
  const type = 'expense';
  return axios.post(`/transactions/type-filter?type=${type}account_id=${account_id}&month=${month}&year=${year}`);
}
