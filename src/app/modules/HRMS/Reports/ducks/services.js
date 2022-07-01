import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const downloadTasks = (payload) => {
  return axios.get(`${apiMethod}/hrms.task_api.create_task_report?formatting=${payload?.formatting}&filters={
    "employee_id":"${payload?.employee_id}",
    "start_date":"${payload?.start_date}"
  }&type=download`);
};

export const downloadEmployee = (payload) => {
  return axios.get(`${apiMethod}/marketing.api.create_employee_report?formatting=${payload?.formatting}&filters={"employee_id":"HR-EMP-00002"}&type=download&orderby=employee_name&order=asc&page_number=1&limit=10`);
};