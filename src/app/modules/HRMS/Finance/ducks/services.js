import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const updateAssets = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Assets/${id}`, payload);
};

export const updateLoan = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Loan/${id}`, payload);
};

export const updateAccount = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Account/${id}`, payload);
};
export const updateSalaryAdvance = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Salary Advance/${id}`, payload);
};
export const updateAllowance = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Allowance/${id}`, payload);
};
export const updateSalaryInformation = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Finance/${id}`, payload);
};

export const addNewAccount = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_emp_finance_detail`, payload);
};

export const addNewAsset = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_emp_finance_detail`, payload);
};

export const addNewLoan = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_emp_finance_detail`, payload);
};

export const addNewSalaryAdvance = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_emp_finance_detail`, payload);
};

export const addNewAllowance = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_emp_finance_detail`, payload);
};

export const deleteAccount = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Account/${id}`, payload);
};
export const deleteAllowance = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Allowance/${id}`, payload);
};
export const deleteAsset = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Assets/${id}`, payload);
};
export const deleteLoan = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Loan/${id}`, payload);
};
