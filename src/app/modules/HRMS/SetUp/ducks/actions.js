import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getTeamList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_team_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.TEAMS_LIST,
      data: message,
    });
  };
};

export const getLeaveTypesList = (page, limit, order) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.leave_type_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.LEAVE_TYPE_LIST,
      data: message,
    });
  };
};

export const getLeaveEntitlementsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_leave_entitlement_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
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

export const getWorkingHoursList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.work_hour_template_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}` : ''
      }&orderby=creation`,
    );
    dispatch({
      type: action_types.WORKING_HOURS_LIST,
      data: message,
    });
  };
};

export const getJobPositionsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.job_position_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.JOB_POSITIONS_LIST,
      data: message,
    });
  };
};

export const getEducationalFieldsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_education_field_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.EDUCATIONAL_FIELDS_LIST,
      data: message,
    });
  };
};

export const getInstitutionsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.institution_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.INSTITUTIONS_LIST,
      data: message,
    });
  };
};

export const getNationalitiesList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_nationality_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.NATIONALITIES_LIST,
      data: message,
    });
  };
};

export const getHolidaysList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_holidays_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.HOLIDAYS_LIST,
      data: message,
    });
  };
};

export const getReligionsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.religion_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.RELIGIONS_LIST,
      data: message,
    });
  };
};

export const getRacesList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.race_pagination?page_number=${page}&limit=${limit}&orderby=creation${
        order ? `&order=${order}` : ''
      }`,
    );
    dispatch({
      type: action_types.RACES_LIST,
      data: message,
    });
  };
};

export const getProjectsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_projects_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.PROJECTS_LIST,
      data: message,
    });
  };
};

export const getWarningLetterList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.warning_letter_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.WARNING_LETTER_LIST,
      data: message,
    });
  };
};

export const getLetterTemplateList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.letter_template_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.LETTER_TEMPLATE_LIST,
      data: message,
    });
  };
};

export const getApproversList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_approver_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.APPROVERS_LIST,
      data: message,
    });
  };
};

export const getAssetsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.hrms_assets_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.ASSETS_LIST,
      data: message,
    });
  };
};

export const getRequestFormsList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.aqa_form_request_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${order}&orderby=creation` : ''
      }`,
    );
    dispatch({
      type: action_types.REQUEST_FORMS_LIST,
      data: message,
    });
  };
};

export const getSingleLeave = (id) => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/HRMS Leave Type/${id}`);
  dispatch({
    type: action_types.SINGLE_LEAVE,
    data: data,
  });
};

export const getEmployeeList = (companyName) => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(
    `${apiresource}/Employee?filters=[["company","=","${companyName}"]]&fields=["name","employee_name"]`,
  );
  dispatch({
    type: action_types.EMPLOYEE_LIST,
    data: data,
  });
};

export const getLeaveList = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(
    'http://cms2dev.limkokwing.net/api/resource/HRMS Leave Type?filters=[["company","=","Limkokwing University Creative Technology"]]&fields=["name","leave_type"]',
  );
  dispatch({
    type: action_types.LEAVE_TYPE,
    data: data,
  });
};

export const getUserList = (page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.hrms_user_role_pagination?page_number=${page}&limit=${limit}${
      order ? `&order=${order}&orderby=creation` : ''
    }`,
  );
  dispatch({
    type: action_types.USERS,
    data: message,
  });
};

export const getSkillList = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get('http://cms2dev.limkokwing.net/api/resource/Skill');
  dispatch({
    type: action_types.SKILLS_LIST,
    data: data,
  });
};
export const getAllApprovers = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(
    'http://cms2dev.limkokwing.net/api/resource/HRMS%20Approver?%20filters=[[company,=,Limkokwing%20University%20Creative%20Technology]]%20&fields=[%22name%22,%22approver_name%22,%22approver_id%22]',
  );
  dispatch({
    type: action_types.ALL_APPROVERS,
    data: data,
  });
};
export const leaveTypeSelect = (boolean) => (dispach) => {
  dispach({
    type: action_types.LEAVE_SELECT_TYPE,
    data: boolean,
  });
};

export const getDepartments = (page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.hrms_department_pagination?page_number=${page}&limit=${limit}${
      order ? `&order=${order}&orderby=creation` : ''
    }`,
  );
  dispatch({
    type: action_types.DEPARTMENT_LSIT,
    data: message,
  });
};

export const showWarningLetter = (data) => (dispatch) => {
  dispatch({
    type: action_types.SHOW_WARNING_LETTER,
    data: data,
  });
};

export const getTempList = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/Letter Template `);
  dispatch({
    type: action_types.TEMP_LIST,
    data: data,
  });
};
