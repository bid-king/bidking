import Axios from 'axios';
const axios = Axios.create();

export const http = {
  get: <Response = unknown>(url: string) => axios.get<Response>(url).then(res => res.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    axios.post<Response>(url, body).then(res => res.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    axios.put<Response>(url, body).then(res => res.data),
  delete: <Response = unknown>(url: string) => axios.delete<Response>(url).then(res => res.data),
};
export const https = {}; //bearer 인증 필요한 경우 이 부분을 구현해야함
