import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getTeamList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_team_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.TEAMS_LIST,
      data: message,
    });
  };
};

export const getLeaveTypesList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.leave_type_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.LEAVE_TYPE_LIST,
      data: message,
    });
  };
};

export const getLeaveEntitlementsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_leave_entitlement_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.LEAVE_ENTITLEMENTS_LIST,
      data: message,
    });
  };
};

export const getUserRolesList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_team_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.TEAMS_LIST,
      data: message,
    });
  };
};

export const getWorkingHoursList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.work_hour_template_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.WORKING_HOURS_LIST,
      data: message,
    });
  };
};

export const getJobPositionsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.job_position_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.JOB_POSITIONS_LIST,
      data: message,
    });
  };
};

export const getEducationalFieldsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_education_field_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.EDUCATIONAL_FIELDS_LIST,
      data: message,
    });
  };
};

export const getInstitutionsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.institution_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.INSTITUTIONS_LIST,
      data: message,
    });
  };
};

export const getNationalitiesList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_nationality_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.NATIONALITIES_LIST,
      data: message,
    });
  };
};

export const getHolidaysList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_holidays_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.HOLIDAYS_LIST,
      data: message,
    });
  };
};

export const getReligionsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.religion_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.RELIGIONS_LIST,
      data: message,
    });
  };
};

export const getRacesList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.race_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.RACES_LIST,
      data: message,
    });
  };
};

export const getProjectsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_projects_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.PROJECTS_LIST,
      data: message,
    });
  };
};

export const getWarningLetterList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.warning_letter_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.WARNING_LETTER_LIST,
      data: message,
    });
  };
};

export const getLetterTemplateList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.letter_template_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.LETTER_TEMPLATE_LIST,
      data: message,
    });
  };
};

export const getApproversList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_approver_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.APPROVERS_LIST,
      data: message,
    });
  };
};

export const getAssetsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_assets_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.ASSETS_LIST,
      data: message,
    });
  };
};

export const getRequestFormsList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.aqa_form_request_pagination?page_number=${page}&limit=${limit}`);
    dispatch({
      type: action_types.REQUEST_FORMS_LIST,
      data: message,
    });
  };
};
