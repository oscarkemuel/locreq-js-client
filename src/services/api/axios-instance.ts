import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const axiosInstance = (axios: AxiosInstance) => {
  return {
    get: function <T>(url: string, config: AxiosRequestConfig = {}) {
      return axios.get<T>(url, config);
    },
    put: function <T>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) {
      return axios.put<T>(url, body, config);
    },
    post: function <T>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) {
      return axios.post<T>(url, body, config);
    },
    delete: function <T>(url: string, config: AxiosRequestConfig = {}) {
      return axios.delete<T>(url, config);
    }
  };
};

export default axiosInstance(instance);