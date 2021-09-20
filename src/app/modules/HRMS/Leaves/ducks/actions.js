import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getOverallTasks = (page, limit, order, approverID, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.getting_overall_leaves?page_number=${page}&limit=${limit}&approver_id=${approverID}${order ? `&order=${order}` : ''}&orderby=employee_id`);
    dispatch({
      type: action_types.OVERALL_TASKS,
      data: message,
    });
  };
};

export const getOverallTasksWithStatus = (status, page, limit, order, approverID, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.getting_overall_leaves_with_status?status=${status}&approver_id=${approverID}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
    dispatch({
      type: action_types.OVERALL_TASKS_WITH_STATUS,
      data: message,
    });
  };
};

export const getTeamTasks = (task, page, limit, order, orderby) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.getting_team_leaves_list?team_name=${task}&page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=creation` : ''}`);
      dispatch({
        type: action_types.TEAM_TASKS,
        data: message,
      });
    };
};

export const getTeamTasksWithStatus = (task,status, page, limit, order, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.getting_team_leaves_list_with_status?team_name=${task}&status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
    dispatch({
      type: action_types.TEAM_TASKS_WITH_STATUS,
      data: message,
    });
  };
};

export const getMyLeaves = (id,status, page, limit, order, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.getting_my_leaves_list_with_status?employee_id=${id}&status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
      dispatch({
        type: action_types.MY_TASKS,
        data: message,
      });
    };
};

export const getMyAvailableLeaves = (id) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.getting_my_leaves?employee_id=${id}`);
      dispatch({
        type: action_types.MY_AVAILABLE_LEAVES,
        data: message,
      });
    };
};

export const getLeaveStatisticListAnnual = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.getting_leaves_statistics_list?orderby=employee_id&order=ASC&leave_type=Annual Leave`);
    dispatch({
      type: action_types.STATISTIC_LIST_ANNUAL,
      data: message,
    });
  };
};

export const getLeaveStatisticListReplacement = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.getting_leaves_statistics_list?orderby=employee_id&order=ASC&leave_type=Replacement Leave`);
    dispatch({
      type: action_types.STATISTIC_LIST_REPLACEMENT,
      data: message,
    });
  };
};

export const getLeaveStatisticListUnpaid = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.getting_leaves_statistics_list?orderby=employee_id&order=ASC&leave_type=Unpaid Leave`);
    dispatch({
      type: action_types.STATISTIC_LIST_UNPAID,
      data: message,
    });
  };
};

export const getLeaveStatisticBar = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.getting_leaves_statistics_bar`);
    dispatch({
      type: action_types.STATISTIC_BAR,
      data: message,
    });
  };
};

// export const getLeaveStatisticBarReplacement = () => {
//   return async (dispatch) => {
//     const {
//       data: { message },
//     } = await axios.get(`${apiMethod}/hrms.api.getting_leaves_statistics_bar?leave_type=Replacement Leave`);
//     dispatch({
//       type: action_types.STATISTIC_BAR_REPLACEMENT,
//       data: message,
//     });
//   };
// };

// export const getLeaveStatisticBarUnpaid = () => {
//   return async (dispatch) => {
//     const {
//       data: { message },
//     } = await axios.get(`${apiMethod}/hrms.api.getting_leaves_statistics_bar?leave_type=Unpaid Leave`);
//     dispatch({
//       type: action_types.STATISTIC_BAR_UNPAID,
//       data: message,
//     });
//   };
// };


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

export const emptyOverall = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_TASKS,
      data: null,
    });
  };
};

export const getTimesheet = (id, status, page, limit, order, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.get_employee_task_list?employee_id=${id}&status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
      dispatch({
        type: action_types.MY_TIMESHEETS,
        data: message,
      });
    };
};