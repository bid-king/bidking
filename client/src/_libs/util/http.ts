import Axios from 'axios';

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

const httpsAxios = async (token: string) => {
  const instance = Axios.create({
    baseURL: ROOT,
    headers: { Authorization: `Bearer ${token}` },
  });

  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    // 정상적인 응답을 하는 경우
    response => {
      return response;
    },
    async error => {
      // 토큰 만료나 유효하지 않은 토큰 때문에 요청이 실패한 경우
      if (error.response && error.response.status === 401 && error.response.data.code === 'EXPIRED_AT') {
        const refreshToken = sessionStorage.getItem('refreshToken'); // 리프레시 토큰 가져오기
        if (!refreshToken) {
          return Promise.reject(error);
        }
        const newAccessToken = await getNewAccessToken(refreshToken);
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return instance.request(error.config);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

async function getNewAccessToken(refreshToken: string) {
  await Axios.post('/api/v1/refresh', { refreshToken })
    .then(res => {
      return res.data.accessToken;
    })
    .catch(err => {
      console.error('토큰 갱신 실패:', err);
    });
  return null;
}
