import axios from 'axios';
import { store } from '../stores/store';

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const service1Axios = axios.create({
  baseURL: 'http://localhost:5274/api/v1',
});

service1Axios.interceptors.request.use(
  (config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service1Axios.interceptors.response.use(async (response) => {
  try {
    await sleep(400);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => service1Axios.get(url).then(responseBody),
  post: (url, body) => service1Axios.post(url, body).then(responseBody),
  put: (url, body) => service1Axios.put(url, body).then(responseBody),
  del: (url) => service1Axios.delete(url).then(responseBody),
};

const CoachGPT = {
    gptrequest: (query) => requests.get('/Account/gpt/' + query),
};

const agent = {
  CoachGPT
};

export default agent;
