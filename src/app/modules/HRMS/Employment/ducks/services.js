import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const employAddApi = (payload) => {
    return axios.post(`${apiresource}/Employee`, payload);
};

export const sendWarning = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_employee_warning`, payload);
};

export const sendShowCause = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_employee_showcause`, payload);
};

export const delWarning = (id, json) => {
  return axios.put(`${apiresource}/EMP Warning Letter/${id}`, json);
};

export const emailCheck = (email) => {
  return axios.get(`${apiMethod}/hrms.api.user_email_exists?email=${email}`)
}

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

export const contractApi = (payload, id) => {
  if (id) {
    return axios.put(`${apiresource}/Contract/${id}`, payload);
  } else {
    return axios.post(`${apiresource}/Contract`, payload);
  }
};
