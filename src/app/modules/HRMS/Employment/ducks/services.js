import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const addEmployer = (payload, id) => {
  if (id) {
    return axios.post(`${apiresource}/Employee/${id}`, payload);
  } else {
    return axios.post(`${apiresource}/Employee`, payload);
  }
};

export const employApi = (payload, id) => {
  if (id) {
    return axios.put(`${apiresource}/Employee/${id}`, payload);
  } else {
    return axios.post(`${apiresource}/Employee`, payload);
  }
};

export const insuranceApi = (payload, id) => {
  if (id) {
      return axios.put(`${apiresource}/Employee Medical/${id}`, payload);
  } else {
    return axios.post(`${apiMethod}/hrms.api.add_employee_medical`, payload);
  }
};

export const addContract = (payload) => {
  return axios.post(`${apiresource}/Contract`, payload);
};
