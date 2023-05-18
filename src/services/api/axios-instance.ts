import { useAuthStore } from '@/store/auth';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().actions.getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().actions.logOut();
    }
    return Promise.reject(error);
  }
);

const axiosInstance = (axiosInstanceCreated: AxiosInstance) => {
  return {
    get: function <T>(url: string, config: AxiosRequestConfig = {}) {
      return axiosInstanceCreated.get<T>(url, config);
    },
    put: function <T>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) {
      return axiosInstanceCreated.put<T>(url, body, config);
    },
    post: function <T>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) {
      return axiosInstanceCreated.post<T>(url, body, config);
    },
    delete: function <T>(url: string, config: AxiosRequestConfig = {}) {
      return axiosInstanceCreated.delete<T>(url, config);
    },
    patch: function <T>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) {
      return axiosInstanceCreated.patch<T>(url, body, config);
    }
  };
};

export default axiosInstance(instance);