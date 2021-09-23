import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const createLeave = (payload) => {
  return axios.post(`${apiresource}/HRMS Leave Type`, payload);
};

export const getSingleLeave = (id) => {
  return axios.get(`${apiresource}/HRMS Leave Type/${id}`);
};
export const updateSingleLeave = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Leave Type/${id}`, payload);
};
export const deleteSingleLeave = (id) => {
  return axios.delete(`${apiresource}/HRMS Leave Type/${id}`);
};
