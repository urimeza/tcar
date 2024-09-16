import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import type { UserType } from '../types/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken = '';

function setAccessToken(newToken: string): void {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError & { config: { sent?: boolean } }) => {
    const prevRequest = error.config;
    if (error.response?.status === 403 && !prevRequest?.sent) {
      const response = await axios<{ user: UserType; accessToken: string }>(
        '/api/auth/tokens/refresh',
      );
      accessToken = response?.data?.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export { setAccessToken };

export default axiosInstance;
