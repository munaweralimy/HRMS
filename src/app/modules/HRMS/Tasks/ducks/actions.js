import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getOverallTasks = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_overall_task_list`);
    dispatch({
      type: action_types.OVERALL_TASKS,
      data: message,
    });
  };
};

export const getOverallTasksWithStatus = (status) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_overall_task_list_with_status?status=${status}`);
    dispatch({
      type: action_types.OVERALL_TASKS_WITH_STATUS,
      data: message,
    });
  };
};

export const getTeamTasks = (task) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.get_team_task_list?team_name=${task}`);
      dispatch({
        type: action_types.TEAM_TASKS,
        data: message,
      });
    };
};

export const getTeamTasksWithStatus = (task,status) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_team_task_list_with_status?team_name=${task}&status=${status}`);
    dispatch({
      type: action_types.TEAM_TASKS_WITH_STATUS,
      data: message,
    });
  };
};

export const getMyTasks = (id) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.get_my_task_list?employee_id=${id}`);
      dispatch({
        type: action_types.MY_TASKS,
        data: message,
      });
    };
};

export const getAddProjectName = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_project_names`);
    dispatch({
      type: action_types.ADD_PROJECT_NAME,
      data: message,
    });
  };
};

export const getProjectName = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/HRMS Projects`);
    dispatch({
      type: action_types.PROJECT_NAME,
      data: data,
    });
  };
};

export const getSingleTaskDetail = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_employee_task_data?employee_id=${id}`);
    dispatch({
      type: action_types.SINGLE_TASK_DETAIL,
      data: message,
    });
  };
};