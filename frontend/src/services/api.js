import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  initiateGitHubLogin: () => {
    window.location.href = `${API_BASE_URL}/api/auth/github/login`;
  },
  
  logout: () => {
    Cookies.remove('auth_token');
  },
};

export const repoService = {
  listRepositories: async () => {
    const response = await api.get('/api/repos/list');
    return response.data;
  },
  
  analyzeRepository: async (repoId) => {
    const response = await api.post(`/api/repos/analyze/${repoId}`);
    return response.data;
  },

  getAnalyses: async () => {
    const response = await api.get('/api/repos/analyses');
    return response.data;
  },
};

export default api;
