import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://artjoms-spole.fly.dev',
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

