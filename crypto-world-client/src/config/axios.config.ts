import axios, { AxiosRequestConfig } from "axios";
import { getToken, logout } from "../services/auth.service";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const token = getToken();

    if (error.response.status === 401 || (error.response.status === 403 && token)) {
      logout();
    }
    return Promise.reject(error);
  }
);

function axiosApi(options: AxiosRequestConfig) {
  return axiosInstance.request(options);
}

export default axiosApi;
