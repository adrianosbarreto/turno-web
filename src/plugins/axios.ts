import axios from 'axios';

const axiosCommon = axios.create({
  baseURL: 'http://localhost/api'
})

const token = localStorage.getItem('access_token');
if (token) {
  axiosCommon.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Configurar o interceptor de resposta
axiosCommon.interceptors.response.use(
  response => response, // Passar as respostas de sucesso sem modificações
  error => {
    if (error.response && error.response.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('access_token'); // Remove o token do localStorage
      delete axiosCommon.defaults.headers.common['Authorization']; // Remove o cabeçalho de autorização do axios

      // Redireciona para a página de login
      window.location.href = '/login';
    }
    return Promise.reject(error); // Propaga o erro para que ele possa ser tratado posteriormente
  }
);

export default axiosCommon;


