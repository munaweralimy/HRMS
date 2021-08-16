import axios from '../../../../../services/axiosInterceptor';
import { apiresource } from '../../../../../configs/constants';

export const addEmployer = (payload) => {
  return axios.post(`${apiresource}/Employee`, payload);
};
export const addContract = (payload) => {
  return axios.post(`${apiresource}/Contract`, payload);
};
