
import axios from "@/plugins/axios";

export function getChecks(account_id : number,  month: number, year: number): Promise<any> {
  return axios.post(`/checks/month-year-filter?account_id=${account_id}&month=${month}&year=${year}`);
}

export function addCheck(account_id : number, check: any): Promise<any>{
  console.log(check, account_id);
  return axios.post(`/checks`, {...check, account_id });
}

export function evaluateCheck(check_id : number, status: string): Promise<any>{
  return axios.put(`/checks/${check_id}`, {status});
}

export function getCheckAdmin(month: number, year: number): Promise<any>{
  return axios.post(`/admin/checks/pending?month=${month}&year=${year}`);
}

export function getCheckById(check_id: string): Promise<any>{
  return axios.get(`/admin/checks/${check_id}`);
}
