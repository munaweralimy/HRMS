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

export const addCountry = (payload) => {
  return axios.post(`${apiresource}/Country`, payload);
};

export const updateSingleCountry = (id, payload) => {
  return axios.put(`${apiresource}/Country/${id}`, payload);
};
export const deleteSingleCountry = (id) => {
  return axios.delete(`${apiresource}/Country/${id}`);
};

export const addSingleHoliday = (payload) => {
  return axios.post(`${apiresource}/HRMS Holidays`, payload);
};

export const updateSingleHoliday = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Holidays/${id}`, payload);
};
export const deleteSingleHoliday = (id) => {
  return axios.delete(`${apiresource}/HRMS Holidays/${id}`);
};

export const addSingleReligion = (payload) => {
  return axios.post(`${apiresource}/Religion`, payload);
};

export const updateSingleReligion = (id, payload) => {
  return axios.put(`${apiresource}/Religion/${id}`, payload);
};
export const deleteSingleReligion = (id) => {
  return axios.delete(`${apiresource}/Religion/${id}`);
};
export const addSingleRace = (payload) => {
  return axios.post(`${apiresource}/Race`, payload);
};

export const updateSingleRace = (id, payload) => {
  return axios.put(`${apiresource}/Race/${id}`, payload);
};
export const deleteSingleRace = (id) => {
  return axios.delete(`${apiresource}/Race/${id}`);
};
export const addSingleAsset = (payload) => {
  return axios.post(`${apiresource}/HRMS Assets`, payload);
};

export const updateSingleAsset = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Assets/${id}`, payload);
};
export const deleteSingleAsset = (id) => {
  return axios.delete(`${apiresource}/HRMS Assets/${id}`);
};
export const addSingleLeaveEntitlement = (payload) => {
  return axios.post(`${apiresource}/HRMS Leave Entitlement`, payload);
};

export const updateSingleLeaveEntitlement = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Leave Entitlement/${id}`, payload);
};
export const deleteSingleLeaveEntitlement = (id) => {
  return axios.delete(`${apiresource}/HRMS Leave Entitlement/${id}`);
};
