import axiosDefault from 'axios';
import store from '../store';
import router from '../router';
import { toast } from 'react-toastify';
import { logout } from '../store/slices/app.slice';

const axios = axiosDefault.create({
  // baseURL: 'https://hotels-api.academlo.tech'
  baseURL: 'https://hotels-api.academlo.tech',
});

axios.interceptors.request.use(function (config) {
  const token = store.getState().app.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(null, (error) => {
  console.log(error);
  if (error.response.status === 403) {
    store.dispatch(logout());
    router.navigate('/login');
    toast('Session expired. You have to login again', {
      theme: 'dark',
      type: 'error',
    });
    return;
  }
  if (error.response?.data?.message?.includes('Invalid credentials')) {
    return Promise.reject(error);
  }
  if (error.response?.data?.message?.includes('Validation error')) {
    return Promise.reject(error);
  }
  toast('There was an error', {
    theme: 'dark',
    type: 'error',
  });
});

export default axios;
