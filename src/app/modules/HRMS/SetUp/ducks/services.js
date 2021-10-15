import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const createLeave = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_leave_type`, payload);
};

export const getSingleLeave = (id) => {
  return axios.get(`${apiresource}/HRMS Leave Type/${id}`);
};
export const updateSingleLeave = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_leave_type/${id}`, payload);
};
export const deleteSingleLeave = (id) => {
  return axios.post(`${apiMethod}hrms.setup.delete_records?doctype=HRMS Leave Type&name=${id}`);
};

export const addEducationField = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_education_field`, payload);
};

export const getSingleEducation = (id) => {
  return axios.get(`${apiresource}/HRMS Education Field/${id}`);
};

export const updateSingleEducation = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_education_field/${id}`, payload);
};
export const deleteSingleEducation = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Education Field&name=${id}`);
};

export const addInstitution = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_institutions`, payload);
};

export const getSingleInstitution = (id) => {
  return axios.get(`${apiresource}/Institutions/${id}`);
};

export const updateSingleInstitution = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_institutions/${id}`, payload);
};
export const deleteSingleInstitution = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=Institutions&name=${id}`);
};

export const addCountry = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_nationality`, payload);
};

export const updateSingleCountry = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_nationality/${id}`, payload);
};
export const deleteSingleCountry = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=Country&name=${id}`);
};

export const addSingleHoliday = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_holidays`, payload);
};

export const updateSingleHoliday = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_holidays/${id}`, payload);
};
export const deleteSingleHoliday = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Holidays&name=${id}`);
};

export const addSingleReligion = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_religion`, payload);
};

export const updateSingleReligion = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_religion/${id}`, payload);
};
export const deleteSingleReligion = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=Religion&name=${id}`);
};
export const addSingleRace = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_race`, payload);
};

export const updateSingleRace = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_race/${id}`, payload);
};
export const deleteSingleRace = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=Race&name=s${id}`);
};
export const addSingleAsset = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_assets`, payload);
};

export const updateSingleAsset = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_assets/${id}`, payload);
};
export const deleteSingleAsset = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Assets&name=${id}`);
};
export const addSingleLeaveEntitlement = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_leave_entitlement`, payload);
};

export const updateSingleLeaveEntitlement = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_leave_entitlement/${id}`, payload);
};
export const deleteSingleLeaveEntitlement = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Leave Entitlement&name=${id}`);
};
export const getSingleTeam = (id) => {
  return axios.get(`${apiresource}/HRMS Teams/${id}`);
};
export const addSingleTeam = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_team`, payload);
};

export const updateSingleTeam = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_team/`, { ...payload, name: id });
};
export const deleteSingleTeam = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Teams&name=${id}`);
};

export const getSingleRole = (id) => {
  return axios.get(`${apiresource}/User Roles/${id}`);
};

export const addUserRoles = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_roles`, payload);
};

export const updateUserRoles = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_roles/${id}`, payload);
};
export const deleteUserRoles = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=User Roles&name=${id}`);
};

export const getSingleProject = (id) => {
  return axios.get(`${apiresource}/HRMS Projects/${id}`);
};

export const addProject = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_projects`, payload);
};

export const updateProjecat = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_projects/${id}`, payload);
};
export const deleteProject = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Projects&name=${id}`);
};

export const addjobPosition = (payload) => {
  return axios.post(`${apiresource}/hrms.setup.create_job_position`, payload);
};

export const updatejobPosition = (id, payload) => {
  return axios.put(`${apiresource}/hrms.setup.create_job_position/${id}`, payload);
};
export const deletejobPosition = (id) => {
  return axios.delete(`${apiresource}/hrms.setup.delete_records?doctype=Job Position&name=${id}`);
};
export const getSingleJob = (id) => {
  return axios.get(`${apiresource}/Job Position/${id}`);
};

export const addSingleDepartment = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_department`, payload);
};
export const updateDepartment = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_department/${id}`, updatePayload);
};
export const deleteDepartment = (id) => {
  return axios.put(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Department&name=${id}`);
};
export const addSingleWarningLetter = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_warning_letter`, payload);
};
export const updateWarningLetter = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiMethod}/hrms.setup.create_warning_letter/${id}`, updatePayload);
};
export const deleteWarningLetter = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Teams&name${id}`);
};
export const getWarningLetterDetail = (id) => {
  return axios.get(`${apiresource}/Warning Letter/${id}`);
};

export const addSingleApprover = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_approver`, payload);
};
export const updateApprover = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_approver/${id}`, updatePayload);
};
export const deleteApprover = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Approver&name=${id}`);
};

export const getApproverDetail = (id) => {
  return axios.get(`${apiresource}/HRMS Approver/${id}`);
};

export const addSingleLetterTemp = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_letter_template`, payload);
};
export const updateletterTemp = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.put(`${apiMethod}/hrms.setup.create_letter_template/${id}`, updatePayload);
};
export const deleteletterTemp = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=Letter Template&name=${id}`);
};

export const getLetterTempDetail = (id) => {
  return axios.get(`${apiresource}/Letter Template/${id}`);
};

export const addWorkingHourTemp = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_working_hour`, payload);
};
export const updateWorkingHourTemp = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_working_hour/${id}`, updatePayload);
};
export const deleteWorkingHourTemp = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=Work Hour Template&name=${id}`);
};

export const getWorkingHourTempDetail = (id) => {
  return axios.get(`${apiresource}/Work Hour Template/${id}`);
};
