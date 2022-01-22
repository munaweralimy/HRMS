import axios from '../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../configs/constants';

export const getPendingIssues = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.dashboard_api.pending_issues`);
    dispatch({
      type: action_types.PENDING_ISSUES,
      data: message,
    });
  };
};

export const getPolicyList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.policy_api.get_policy_list`);
    dispatch({
      type: action_types.POLICY_LIST,
      data: message,
    });
  };
};

export const getTimesheetData = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_current_month_timesheet`);
    dispatch({
      type: action_types.TIMESHEET_DATA,
      data: message,
    });
  };
};

export const getCheckInData = (id, date) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.last_clock.checkin_dashboard?employee_id=${id}`);
    dispatch({
      type: action_types.CHECK_IN_DATA,
      data: message,
    });
  };
};

export const getCalenderData = (sDate, eDate) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.approved_leaves_calender?start_date=${sDate}&end_date=${eDate}`);
    dispatch({
      type: action_types.CALENDER_DATA,
      data: message,
    });
  };
};

export const getStaffPerformance = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.dashboard_api.staff_performance?order=ASC&orderby=employee_id`);
    dispatch({
      type: action_types.STAFF_DATA,
      data: message,
    });
  };
};

export const getTeamsDetail = (employeeid) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.attendance_api.get_employee_team_list?employee_id=${employeeid}`);
    dispatch({
      type: action_types.EMPLOYEE_ID,
      data: message,
    });
  };
};
 
export const getCountry = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Country?limit_page_length=0`);
    dispatch({
      type: action_types.COUNTRY,
      data: data,
    });
  };
};



export const getRace = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "Race"}});
    dispatch({
      type: action_types.RACE,
      data: message,
    });
  };
};

export const getMarital = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Marital Status`);
    dispatch({
      type: action_types.MARITAL_STATUS,
      data: data,
    });
  };
};

export const getReligion = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "Religion"}});
    dispatch({
      type: action_types.RELIGION,
      data: message,
    });
  };
};

export const getAppType = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Application Type`);
    dispatch({
      type: action_types.APPLICATION_TYPE,
      data: data,
    });
  };
};

export const getGender = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Gender`);
    dispatch({
      type: action_types.GENDER,
      data: data,
    });
  };
};

export const getEngQualification = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/English Qualification`);
    dispatch({
      type: action_types.ENG_QUALIFICATION,
      data: data,
    });
  };
};

export const getProgName = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.api.get_program_names_list`);
    dispatch({
      type: action_types.PROGRAMME_NAME,
      data: message,
    });
  };
};

export const getInstitution = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.get_institutions`);
    dispatch({
      type: action_types.INTITUTION_LIST,
      data: message,
    });
  };
};

export const getTeams = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "HRMS Teams"}});
    dispatch({
      type: action_types.TEAM_LISTING,
      data: message,
    });
  };
};

export const getTeams2 = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.get_team_names`);
    dispatch({
      type: action_types.TEAM_LISTING2,
      data: message,
    });
  };
};


export const getRoles = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "User Roles"}});
    dispatch({
      type: action_types.ROLE_LIST,
      data: message,
    });
  };
};

export const getEducationType = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "HRMS Education Field"}});
    dispatch({
      type: action_types.EDUCATION_TYPE,
      data: message,
    });
  };
};

export const getCompany = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Company`);
    dispatch({
      type: action_types.COMPANY_LIST,
      data: data,
    });
  };
};



export const getStaffs = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "Employee"}});
    dispatch({
      type: action_types.SUPERVISOR_LIST,
      data: message,
    });
  };
};

export const getJobs = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "Job Position"}});
    dispatch({
      type: action_types.JOBS_LIST,
      data: message,
    });
  };
};

export const getComments = (doctype, id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_message?doctype=${doctype}&doc_name=${id}`);
    dispatch({
      type: action_types.ALL_COMMENTS,
      data: message,
    });
  };
};

export const emptyComments = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_COMMENTS,
      data: [],
    });
  };
};

export const updateMenu = (stat) => {
  return (dispatch) => {
    dispatch({
      type: action_types.MENU_STAT,
      data: stat,
    });
  };
};

export const getAllProjects = (search = null) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_projects_dropdown`);
    dispatch({
      type: action_types.ALL_PROJECTS,
      data: message,
    });
  };
};
