import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getsearchTasks = (payload) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.task_api.create_task_report?formatting=${payload?.formatting}&filters={
      "employee_id":"${payload?.employee_id}",
      "start_date":"${payload?.start_date}"
    }&type=search`);
    dispatch({
      type: action_types.SEARCH_TASK,
      data: message,
    });
  };
};

export const getEmployeeTasks = (payload) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.api.create_employee_report?formatting=EXCEL&filters={
      "employee_id":"${payload?.employee_id}",
      "start_date":"${payload?.start_date}"
    }&type=search&orderby=employee_name&order=asc&page_number=1&limit=10`);
    dispatch({
      type: action_types.SEARCH_EMPLOYEE,
      data: message,
    });
  };
};
