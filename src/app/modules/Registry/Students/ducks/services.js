import axios from '../../../../../services/axiosInterceptor';
import { apiresource } from '../../../../../configs/constants';

export const getSingleAppData = (appId) => {
  return axios.get(`${apiresource}/AQA Form Request/${appId}`);
};

export const updateRequest = (payload) => {
  return axios.put(`${apiresource}/AQA Form Request/Transfer Grade`, payload);
};
