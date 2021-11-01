import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getEmployeeProfile = (employeeID) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.dashboard_api.employment_details?empid=${employeeID}`);
    dispatch({
      type: action_types.PROFILE_DATA,
      data: message,
    });
  };
};

export const getSingleSkills = (employeeID) => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/HRMS Advancement/${employeeID}`);
    dispatch({
      type: action_types.SINGLE_SKILLS,
      data: data,
    });
  };
};