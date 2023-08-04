import Axios from 'axios';

export const API_URL = 'http://70.12.247.172:5000';
// export const API_URL = 'http://localhost:5000';

export async function getToken() {
  const persistedState = sessionStorage.getItem('persist:root');
  if (persistedState) {
    const state = JSON.parse(persistedState);
    const user = JSON.parse(state.user);
    return user?.accessToken;
  }
  return null;
}

const httpAxios = Axios.create({
  baseURL: API_URL,
});

const httpsAxios = async () => {
  const BEARER_TOKEN = await getToken();
  return Axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${BEARER_TOKEN}`, 'Content-Type': 'multipart/form-data' },
  });
};

export const http = {
  get: <Response = unknown>(url: string) => httpAxios.get<Response>(url).then(res => res.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.post<Response>(url, body).then(res => res.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.put<Response>(url, body).then(res => res.data),
  delete: <Response = unknown>(url: string) => httpAxios.delete<Response>(url).then(res => res.data),
};

export const https = {
  get: async <Response = unknown>(url: string) => (await httpsAxios()).get<Response>(url).then(res => res.data),
  post: async <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    (await httpsAxios()).post<Response>(url, body).then(res => res.data),
  put: async <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    (await httpsAxios()).put<Response>(url, body).then(res => res.data),
  delete: async <Response = unknown>(url: string) => (await httpsAxios()).delete<Response>(url).then(res => res.data),
};
