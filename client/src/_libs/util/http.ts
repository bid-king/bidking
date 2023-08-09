import Axios from 'axios';
import { useAppSelector } from '../../store/hooks';

export const ROOT = process.env.REACT_APP_API_ROOT;

const httpAxios = Axios.create({
  baseURL: ROOT,
});

export const http = {
  get: <Response = unknown>(url: string) => httpAxios.get<Response>(url).then(res => res.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.post<Response>(url, body).then(res => res.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.put<Response>(url, body).then(res => res.data),
  delete: <Response = unknown>(url: string) => httpAxios.delete<Response>(url).then(res => res.data),
};

const httpsAxios = async (token: string) => {
  return Axios.create({
    baseURL: ROOT,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const https = {
  get: async <Response = unknown>(url: string, token: string) =>
    (await httpsAxios(token)).get<Response>(url).then(res => res.data),
  post: async <Response = unknown, Request = unknown>(url: string, token: string, body?: Request) =>
    (await httpsAxios(token)).post<Response>(url, body).then(res => res.data),
  put: async <Response = unknown, Request = unknown>(url: string, token: string, body?: Request) =>
    (await httpsAxios(token)).put<Response>(url, body).then(res => res.data),
  delete: async <Response = unknown>(url: string, token: string) =>
    (await httpsAxios(token)).delete<Response>(url).then(res => res.data),
};
