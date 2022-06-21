import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const downloadTasks = (payload) => {
  return axios.post(`${apiMethod}/hrms.task_api.create_task_report`, payload);
};

export const downloadEmployee = (payload) => {
  return axios.post(`${apiMethod}/marketing.api.create_employee_report`, payload);
};