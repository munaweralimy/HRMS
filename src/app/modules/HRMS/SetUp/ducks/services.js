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

export const addEducationField = (payload) => {
  return axios.post(`${apiresource}/HRMS Education Field`, payload);
};

export const getSingleEducation = (id) => {
  return axios.get(`${apiresource}/HRMS Education Field/${id}`);
};

export const updateSingleEducation = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Education Field/${id}`, payload);
};
export const deleteSingleEducation = (id) => {
  return axios.delete(`${apiresource}/HRMS Education Field/${id}`);
};

export const addInstitution = (payload) => {
  return axios.post(`${apiresource}/Institutions`, payload);
};

export const getSingleInstitution = (id) => {
  return axios.get(`${apiresource}/Institutions/${id}`);
};

export const updateSingleInstitution = (id, payload) => {
  return axios.put(`${apiresource}/Institutions/${id}`, payload);
};
export const deleteSingleInstitution = (id) => {
  return axios.delete(`${apiresource}/Institutions/${id}`);
};
