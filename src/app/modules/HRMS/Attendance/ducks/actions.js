import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getOverallAttendance = (page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.get_overall_attendance_pagination?page_number=${page}&limit=${limit}${
      orderby ? `&order=${order}&orderby=${orderby}` : ''
    }`,
  );
  dispatch({
    type: action_types.OVERALL_ATTENDANCE,
    data: message,
  });
};

export const getOverallAttendanceList = (page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.get_all_attendance_pagination?page_number=${page}&limit=${limit}${
      orderby ? `&order=${order}&orderby=${orderby}` : ''
    }`,
  );
  dispatch({
    type: action_types.OVERALL_ATTENDANCE_LIST,
    data: message,
  });
};

export const getTeamAttendance = (team, page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.get_my_team_attendance_pagination?team=${team}&page_number=${page}&limit=${limit}${
      orderby ? `&order=${order}&orderby=${orderby}` : ''
    }`,
  );
  dispatch({
    type: action_types.TEAM_ATTENDANCE,
    data: message,
  });
};

export const getMyAttendance = (employeeID, page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.get_single_employee_attendance_pagination?employee=${employeeID}&page_number=${page}&limit=${limit}${
      orderby ? `&order=${order}&orderby=${orderby}` : ''
    }`,
  );
  dispatch({
    type: action_types.MY_ATTENDANCE,
    data: message,
  });
};

export const getSingleAttendanceDetail = (id) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/hrms.api.get_single_attendance?name=${id}`);
  dispatch({
    type: action_types.SINGLE_ATTENDANCE,
    data: message,
  });
};

export const getTotalAttendance = (id) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/hrms.api.absent_count_single_employee?employee_id=${id}`);
  dispatch({ type: action_types.TOTAL_ABSENT, data: message });
};
