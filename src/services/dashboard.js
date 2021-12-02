import axios from './axiosInterceptor';
import { apiMethod, apiresource } from '../configs/constants';

export const getDelayedApplication = () => {
  return axios.get(
    `${apiresource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",0]]`,
  );
};

export const getDelayedApplicationCount = () => {
  return axios.get(
    `${apiresource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",0]]&limit_page_length=None`,
  );
};

export const getIncompleteApplicationProgress = () => {
  return axios.get(`${apiMethod}/marketing.api.get_incomplete_application_list`);
};

export const getIncompleteDoc = (params) => {
  return axios.get(
    `${apiresource}/Application?fields=["name","applicant_name","workflow_state"]&filters=[["docstatus","=",0],["workflow_state","=","${params}"]]`,
  );
};

export const addApplication = (data) => {
  return axios.post(`${apiresource}/Application`, data);
};

export const uploadImage = (data) => {
  return axios.post(`${apiMethod}/marketing.api.uploadImageToken`, data);
};

export const getapplicationDetial = (appURL) => {
  return axios.get(`${apiresource}/Application/${appURL}`);
};

export const editapplicationDetial = (appURL, data) => {
  return axios.put(`${apiresource}/Application/${appURL}`, data);
};

export const changePassword = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.check_current_password`, payload);
};
