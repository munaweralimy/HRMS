import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const downloadTasks = (payload) => {
  return axios.get(`${apiMethod}/hrms.task_api.create_task_report?formatting=${payload?.formatting}&filters={${payload?.employee_id && `"employee_id":"${payload?.employee_id}",`}${`"employee_name":"${payload?.employee_name}",`}${`"hours":"${payload?.hours}",`}${`"start_date":"${payload?.start_date}",`}${`"end_date":"${payload?.end_date}"`}}&type=download`);
};

export const downloadEmployee = (payload) => {
  return axios.get(`${apiMethod}/marketing.api.create_employee_report?formatting=${payload?.formatting}&filters={${payload?.employee_id && `"employee_id":"${payload?.employee_id}",`}${`"employee_name":"${payload?.employee_name}",`}${`"team_name":"${payload?.team_name}",`}${`"contract_type":"${payload?.contract_type}",`}${`"start_date":"${payload?.start_date}",`}${`"end_date":"${payload?.end_date}"`}}&type=download`);
};