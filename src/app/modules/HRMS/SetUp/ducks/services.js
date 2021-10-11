import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const createLeave = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.hrms_leave_type_create_records`, payload);
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
export const getSingleTeam = (id) => {
  return axios.get(`${apiresource}/HRMS Teams/${id}`);
};
export const addSingleTeam = (payload) => {
  return axios.post(`${apiresource}/HRMS Teams`, payload);
};

export const updateSingleTeam = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Teams/${id}`, payload);
};
export const deleteSingleTeam = (id) => {
  return axios.delete(`${apiresource}/HRMS Teams/${id}`);
};

export const getSingleRole = (id) => {
  return axios.get(`${apiresource}/User Roles/${id}`);
};

export const addUserRoles = (payload) => {
  return axios.post(`${apiresource}/User Roles`, payload);
};

export const updateUserRoles = (id, payload) => {
  return axios.put(`${apiresource}/User Roles/${id}`, payload);
};
export const deleteUserRoles = (id) => {
  return axios.delete(`${apiresource}/User Roles/${id}`);
};

export const getSingleProject = (id) => {
  return axios.get(`${apiresource}/HRMS Projects/${id}`);
};

export const addProject = (payload) => {
  return axios.post(`${apiresource}/HRMS Projects`, payload);
};

export const updateProjecat = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Projects/${id}`, payload);
};
export const deleteProject = (id) => {
  return axios.delete(`${apiresource}/HRMS Projects/${id}`);
};

export const addjobPosition = (payload) => {
  return axios.post(`${apiresource}/Job Position`, payload);
};

export const updatejobPosition = (id, payload) => {
  return axios.put(`${apiresource}/Job Position/${id}`, payload);
};
export const deletejobPosition = (id) => {
  return axios.delete(`${apiresource}/Job Position/${id}`);
};
export const getSingleJob = (id) => {
  return axios.get(`${apiresource}/Job Position/${id}`);
};

export const addSingleDepartment = (payload) => {
  return axios.post(`${apiresource}/HRMS Department`, payload);
};
export const updateDepartment = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiresource}/HRMS Department/${id}`, updatePayload);
};
export const deleteDepartment = (id, payload) => {
  return axios.put(`${apiresource}/HRMS Department/${id}`, payload);
};
export const addSingleWarningLetter = (payload) => {
  return axios.post(`${apiresource}/Warning Letter`, payload);
};
export const updateWarningLetter = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiresource}/Warning Letter/${id}`, updatePayload);
};
export const deleteWarningLetter = (id, payload) => {
  return axios.delete(`${apiresource}/Warning Letter/${id}`, payload);
};
export const getWarningLetterDetail = (id) => {
  return axios.get(`${apiresource}/Warning Letter/${id}`);
};

export const addSingleApprover = (payload) => {
  return axios.post(`${apiresource}/HRMS Approver`, payload);
};
export const updateApprover = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiresource}/HRMS Approver/${id}`, updatePayload);
};
export const deleteApprover = (id, payload) => {
  return axios.delete(`${apiresource}/HRMS Approver/${id}`, payload);
};

export const getApproverDetail = (id) => {
  return axios.get(`${apiresource}/HRMS Approver/${id}`);
};

export const addSingleLetterTemp = (payload) => {
  return axios.post(`${apiresource}/Letter Template`, payload);
};
export const updateletterTemp = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiresource}/Letter Template/${id}`, updatePayload);
};
export const deleteletterTemp = (id, payload) => {
  return axios.delete(`${apiresource}/Letter Template/${id}`, payload);
};

export const getLetterTempDetail = (id) => {
  return axios.get(`${apiresource}/Letter Template/${id}`);
};
