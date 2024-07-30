
import axios from "@/plugins/axios";
import Check from "@/types/Check";

export function getChecks(account_id : number,  month: number, year: number): Promise<any> {
  return axios.post(`/checks/month-year-filter?account_id=${account_id}&month=${month}&year=${year}`);
}

export function addCheck(account_id : string, check: Check): Promise<any>{
  return axios.post(`/checks`, {...check, account_id });
}
