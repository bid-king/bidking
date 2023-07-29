import Axios from 'axios';
const API_URL = 'http://70.12.247.172:5000';
const BEARER_TOKEN = 'TOKEN';

const httpAxios = Axios.create({
  baseURL: API_URL,
});

const httpsAxios = Axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
});

export const http = {
  get: <Response = unknown>(url: string) => httpAxios.get<Response>(url).then(res => res.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.post<Response>(url, body).then(res => res.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.put<Response>(url, body).then(res => res.data),
  delete: <Response = unknown>(url: string) => httpAxios.delete<Response>(url).then(res => res.data),
};

export const https = {
  get: <Response = unknown>(url: string) => httpsAxios.get<Response>(url).then(res => res.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpsAxios.post<Response>(url, body).then(res => res.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpsAxios.put<Response>(url, body).then(res => res.data),
  delete: <Response = unknown>(url: string) => httpsAxios.delete<Response>(url).then(res => res.data),
};
