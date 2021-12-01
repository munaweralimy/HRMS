import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getOverallTasks = (page, limit, order, approverID, orderby, company) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_overall_leaves?company=${company}&page_number=${page}&limit=${limit}&approver_id=${approverID}${order ? `&order=${order}` : ''}&orderby=employee_id`);
    dispatch({
      type: action_types.OVERALL_TASKS,
      data: message,
    });
  };
};

export const getOverallTasksWithStatus = (status, page, limit, order, approverID, orderby, search = null, company) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_overall_leaves_with_status?company=${company}&status=${status}&approver_id=${approverID}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
    dispatch({
      type: action_types.OVERALL_TASKS_WITH_STATUS,
      data: message,
    });
  };
};

export const getCarryForwardStatus = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.get_carry_forward_expiry_status?employee_id=${id}`);
    dispatch({
      type: action_types.CARRY_FORWARD_STATUS,
      data: message,
    });
  };
};

export const getTeamTasks = (task, page, limit, order, orderby, company) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_team_leaves_list?company=${company}&team_name=${task}&page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=creation` : ''}`);
      dispatch({
        type: action_types.TEAM_LEAVES,
        data: message,
      });
    };
};

export const emptyAllLeaves = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_ALL_LEAVES,
      data: [],
    });
  }
}

export const getTeamTasksWithStatus = (task,status, page, limit, order, orderby, search = null, company) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_team_leaves_list_with_status?company=${company}&team_name=${task}&status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
    dispatch({
      type: action_types.TEAM_LEAVES_WITH_STATUS,
      data: message,
    });
  };
};

export const getMyLeaves = (id,status, page, limit, order, orderby, company) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_my_leaves_list_with_status?company=${company}&employee_id=${id}&status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
      dispatch({
        type: action_types.MY_LEAVES,
        data: message,
      });
    };
};

export const getMyAvailableLeaves = (id, company) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_my_leaves?company=${company}&employee_id=${id}`);
      dispatch({
        type: action_types.MY_AVAILABLE_LEAVES,
        data: message,
      });
    };
};

export const getLeaveStatisticList = (status, company) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_leaves_statistics_list?company=${company}&orderby=taken_employee_leaves&order=ASC&leave_type=${status}`);
    dispatch({
      type: action_types.STATISTIC_LIST,
      data: message,
    });
  };
};

export const getLeaveStatisticBar = (company) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_leaves_statistics_bar?company=${company}&leave_type=Annual Leave`);
    dispatch({
      type: action_types.STATISTIC_BAR,
      data: message,
    });
  };
};

export const getSingleLeaveDetail = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_my_leaves?employee_id=${id}`);
    dispatch({
      type: action_types.SINGLE_LEAVE_DETAIL,
      data: message,
    });
  };
};

export const getLeaveApplicationDetail = (id,status) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_my_leaves_list_with_status?employee_id=${id}&status=${status}`);
    dispatch({
      type: action_types.APPLICATION_LEAVE_DETAIL,
      data: message,
    });
  };
};

export const getLeaveType = (company) => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/HRMS Leave Type?filters=[["company","=","${company}"]]&fields=["name","leave_type"]`);
    dispatch({
      type: action_types.LEAVE_TYPE,
      data: data,
    });
  };
};

export const getLeaveData = (type,employeeID, company) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_leaves_data?employee_id=${employeeID}&leave_type=${type}&company=${company}`);
    dispatch({
      type: action_types.LEAVE_DATA,
      data: message,
    });
  };
};

export const getLeaveApprovers = (type,employeeID, company) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.get_leave_type_approvers?leave_type=${type}&company=${company}&employee_id=${employeeID}`);
    dispatch({
      type: action_types.LEAVE_APPROVERS,
      data: message,
    });
  };
};

export const getHolidaysList = (company) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.getting_holiday_list_and_criteria?company=${company}`);
    dispatch({
      type: action_types.HOLIDAYS_LIST,
      data: message,
    });
  };
};

export const getAddProjectName = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.get_project_names`);
    dispatch({
      type: action_types.ADD_PROJECT_NAME,
      data: message,
    });
  };
};

export const getEntitlement = (employeID) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.leaves_api.availibilities_entitlements?employee_id=${employeID}`);
    dispatch({
      type: action_types.ENTITLEMENT,
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