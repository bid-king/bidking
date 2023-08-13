const Axios = require('axios');

const ROOT = process.env.NODE_APP_API_ROOT;

const axios = Axios.create({
  baseURL: ROOT,
});

module.exports.http = {
  get: url => axios.get(url).then(res => res.data),
  post: (url, body) => axios.post(url, body).then(res => res.data),
  put: (url, body) => axios.put(url, body).then(res => res.data),
  delete: url => axios.delete(url).then(res => res.data),
};
