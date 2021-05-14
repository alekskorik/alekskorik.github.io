import axios from 'axios';

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.status === 401) {
      onLoginFail();
      return;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;

};
