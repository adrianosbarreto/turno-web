import axios from "@/plugins/axios";

export function getTransactionByType(account_id : number,  type: string | null, month: number, year: number): Promise<any> {
  let url = `/transactions/type-filter?account_id=${account_id}&month=${month}&year=${year}`;

  if (type !== null) {
    url += `&type=${type}`;
  }

  return axios.post(url);
}
