import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getsearchTasks = (payload) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.task_api.create_task_report?formatting=${payload?.formatting}&filters={${`"employee_id":"${payload?.employee_id}",`}${`"employee_name":"${payload?.employee_name}",`}${`"hours":"${payload?.hours}",`}${`"start_date":"${payload?.start_date}",`}${`"end_date":"${payload?.end_date}"`}}&type=search`);
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
    } = await axios.get(`${apiMethod}/marketing.api.create_employee_report?formatting=${payload?.formatting}&filters={${`"employee_id":"${payload?.employee_id}",`}${`"employee_name":"${payload?.employee_name}",`}${`"team_name":"${payload?.team_name}",`}${`"contract_type":"${payload?.contract_type}",`}${`"start_date":"${payload?.start_date}",`}${`"end_date":"${payload?.end_date}"`}}&type=search`);
    dispatch({
      type: action_types.SEARCH_EMPLOYEE,
      data: message,
    });
  };
};
