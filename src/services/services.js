import axiosInterceptor from './axiosInterceptor';
import { apiMethod, apiresource } from '../configs/constants';
const auth = apiMethod + '/frappe.integrations.oauth2.get_token';

const getQueryString = (data = {}) => {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const authentications = (username, password) => {
  const data = {
    grant_type: 'password',
    client_id: 'b9092f2e04',
    redirect_url: 'https://getpostman.com/oauth2/callback',
    username: username,
    password: password,
  };
  const postData = getQueryString(data);
  return axiosInterceptor.post(auth, postData);
};

export const refreshAuth = (refresh) => {
  const data = {
    refresh_token: refresh,
    grant_type: 'refresh_token',
    client_id: '684e559103',
    redirect_url: 'https://getpostman.com/oauth2/callback',
  };
  const postData = getQueryString(data);
  return axiosInterceptor.post(auth, postData);
};
