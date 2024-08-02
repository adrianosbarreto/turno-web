import axios from "@/plugins/axios";


export function getBalance(account_id : number): Promise<any> {
  return axios.get(`/account/balance/${account_id}`);
}

export function registerAccount(data : any): Promise<any> {
  return axios.post(`/register`, data);
}

export function login(data : any): Promise<any> {
  return axios.post(`/login`, data);
}



