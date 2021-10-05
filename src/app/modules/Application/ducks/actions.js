import axios from '../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../configs/constants';



export const getPendingIssues = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.pending_issues`);
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
    } = await axios.get(`${apiMethod}/hrms.api.get_policy_list?company=Limkokwing University Creative Technology`);
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
    } = await axios.get(`${apiMethod}/hrms.api.checkin_dashboard?employee_id=${id}&attendance_date=${date}`);
    dispatch({
      type: action_types.CHECK_IN_DATA,
      data: message,
    });
  };
};




export const getCountry = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Country`);
    dispatch({
      type: action_types.COUNTRY,
      data: data,
    });
  };
};

export const getRace = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Race`);
    dispatch({
      type: action_types.RACE,
      data: data,
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
      data: { data },
    } = await axios.get(`${apiresource}/Religion`);
    dispatch({
      type: action_types.RELIGION,
      data: data,
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
  return async(dispatch) => {
      const {
          data: { data },
      } = await axios.get(`${apiresource}/Institutions`);
      dispatch({
          type: action_types.INTITUTION_LIST,
          data: data,
      });
  };
};

export const getTeams = () => {
  return async(dispatch) => {
      const {
          data: { data },
      } = await axios.get(`${apiresource}/HRMS Teams?fields=["name","team_name"]`);
      dispatch({
          type: action_types.TEAM_LISTING,
          data: data,
      });
  };
};

export const getRoles = () => {
  return async(dispatch) => {
      const {
          data: { data },
      } = await axios.get(`${apiresource}/User Roles`);
      dispatch({
          type: action_types.ROLE_LIST,
          data: data,
      });
  };
};

export const getEducationType = () => {
  return async(dispatch) => {
      const {
          data: { data },
      } = await axios.get(`${apiresource}/HRMS Education Field?fields=["name","education_field"]`);
      dispatch({
          type: action_types.EDUCATION_TYPE,
          data: data,
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
      data: { data },
    } = await axios.get(`${apiresource}/Employee?fields=["name","employee_name"]`);
    dispatch({
      type: action_types.SUPERVISOR_LIST,
      data: data,
    });
  };
};

export const getJobs = () => {
return async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/Job Position`);
  dispatch({
    type: action_types.JOBS_LIST,
    data: data,
  });
};
};


export const getComments = (doctype, id) => {
    return async(dispatch) => {
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