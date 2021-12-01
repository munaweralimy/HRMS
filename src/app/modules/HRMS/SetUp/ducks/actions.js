import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getTeamList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_team_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.TEAMS_LIST,
      data: message,
    });
  };
};

export const getLeaveTypesList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.leave_type_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.LEAVE_TYPE_LIST,
      data: message,
    });
  };
};

export const getLeaveEntitlementsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_leave_entitlement_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.LEAVE_ENTITLEMENTS_LIST,
      data: message,
    });
  };
};

export const getUserRolesList = (page, limit, order, orderby = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_team_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.TEAMS_LIST,
      data: message,
    });
  };
};

export const getWorkingHoursList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.work_hour_template_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.WORKING_HOURS_LIST,
      data: message,
    });
  };
};

export const getJobPositionsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.job_position_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.JOB_POSITIONS_LIST,
      data: message,
    });
  };
};

export const getEducationalFieldsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_education_field_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.EDUCATIONAL_FIELDS_LIST,
      data: message,
    });
  };
};

export const getInstitutionsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.institution_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.INSTITUTIONS_LIST,
      data: message,
    });
  };
};

export const getNationalitiesList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_nationality_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.NATIONALITIES_LIST,
      data: message,
    });
  };
};

export const getHolidaysList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_holidays_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.HOLIDAYS_LIST,
      data: message,
    });
  };
};

export const getReligionsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.religion_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.RELIGIONS_LIST,
      data: message,
    });
  };
};

export const getRacesList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.race_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.RACES_LIST,
      data: message,
    });
  };
};

export const getProjectsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_projects_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.PROJECTS_LIST,
      data: message,
    });
  };
};

export const getWarningLetterList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.warning_letter_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.WARNING_LETTER_LIST,
      data: message,
    });
  };
};

export const getLetterTemplateList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.letter_template_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.LETTER_TEMPLATE_LIST,
      data: message,
    });
  };
};

export const getApproversList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_approver_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.APPROVERS_LIST,
      data: message,
    });
  };
};

export const getAssetsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_assets_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.ASSETS_LIST,
      data: message,
    });
  };
};

export const getRequestFormsList = (page, limit, order, orderby, search = null) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.request_form_listing?${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
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
    `${apiresource}/Employee?limit_page_length=0&filters=[["company","=","${companyName}"]]&fields=["name","employee_name"]`,
  );
  dispatch({
    type: action_types.EMPLOYEE_LIST,
    data: data,
  });
};

export const getLeaveList = (company) => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(
    `${apiresource}/HRMS Leave Type?filters=[["company","=","${company}"]]&fields=["name","leave_type"]`,
  );
  dispatch({
    type: action_types.LEAVE_TYPE,
    data: data,
  });
};

export const getUserList =
  (page, limit, order, orderby, search = null) =>
  async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_user_role_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.USERS,
      data: message,
    });
  };

export const getSkillList = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/Skill`);
  dispatch({
    type: action_types.SKILLS_LIST,
    data: data,
  });
};
export const getAllApprovers = (company) => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(
    `${apiresource}/HRMS Approver?filters=[["company","=","${company}"]]&fields=["name","approver_name","approver_id"]`,
  );
  dispatch({
    type: action_types.ALL_APPROVERS,
    data: data,
  });
};
export const leaveTypeSelect = (data) => (dispach) => {
  dispach({
    type: action_types.LEAVE_SELECT_TYPE,
    data: data,
  });
};

export const getDepartments =
  (page, limit, order, orderby, search = null) =>
  async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.setup.hrms_department_pagination?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
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

export const getAllDepartmentList = (company) => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(
    `${apiresource}/HRMS Department?filters=[["company","=", "${company}"]]&fields=["name","department_name"]&order_by=name&start=1 `,
  );
  dispatch({
    type: action_types.GET_DEAPRTMENTS,
    data: data,
  });
};

export const getALlLetterTemp = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/Letter Template`);
  dispatch({
    type: action_types.LETTER_TEMP,
    data: data,
  });
};

export const getSpecificEmployee = (url, id, company) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/${url}?name_id=${id}&company=${company}`);
  dispatch({
    type: action_types.GET_USER_SPCIFIC,
    data: message,
  });
};
export const filterLeaveType = (company) => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/HRMS Leave Type?filters=[["company", "=", "${company}"]]&fields=["name","leave_type"]
  `);
  dispatch({
    type: action_types.FILTER_LEAVE_TYPE,
    data: data,
  });
};
export const filterLeaveEntitlementName = (company) => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/HRMS Leave Entitlement?filters=[["company", "=", "${company}"]]&fields=["name"]
  `);
  dispatch({
    type: action_types.FILTER_ENTITLEMENT,
    data: data,
  });
};
