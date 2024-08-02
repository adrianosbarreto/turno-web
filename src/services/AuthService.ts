import axiosCommon from "@/plugins/axios";

export function isAuthenticated() : boolean {
  return !!localStorage.getItem('access_token');
}

export function isAdmin(): boolean {
  return localStorage.getItem('user_type') === 'admin';
}

export const logout = () => {
  return axiosCommon.post('/logout');
}
