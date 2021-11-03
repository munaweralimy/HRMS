import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getStudentsList = (status) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_students_list_from_students?status=${status}`);
    dispatch({
      type: action_types.STUDENTS_LIST,
      data: message,
    });
  };
};

export const getStudentsListPg = (status, page, limit, order, orderby) => {
  return async (dispatch) => {
    let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_students_list_from_students_pagination${status ? '?status='+status : ''}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);;
    dispatch({
      type: action_types.STUDENTS_LIST,
      data: message,
    });
  };
};

export const studentsStatus = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_pending_application`);
    dispatch({
      type: action_types.PENDING_LIST,
      data: message,
    });
  };
};

export const getStudentAppdetails = (AppId) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_application_specific_user?application_id=${AppId}`);
    dispatch({
      type: action_types.STUDENT_APP_DETAIL,
      data: message,
    });
  };
};

export const getStudentdetails = (studentid) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_student_specific_user?student_id=${studentid}`);
    dispatch({
      type: action_types.STUDENT_APP_DETAIL,
      data: message,
    });
  };
};

export const getTimetable = (studentid, semester) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/registry.api.get_timetable_from_program_code?program_code=${studentid}&semester=${semester}`,
    );
    dispatch({
      type: action_types.TIME_TABLE,
      data: message,
    });
  };
};

export const emptyStudentApp = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_STUDENT_APP,
      data: {},
    });
  };
};

export const registryData = (studentID) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/registry.api.get_students_requests?student_id=${studentID}`);
  dispatch({
    type: action_types.REQUEST_DATA,
    data: message,
  });
};
