import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import * as action_types from './constant';

export const closeAllOpenForms = (bol) => {
  return (dispatch) => {
    dispatch({
      type: action_types.CHANGE_TAB,
      data: bol,
    });
  };
};

export const getOverallFinance = (page, limit) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/hrms.api.emp_finance_overall?page_number=${page}&limit=${limit}`);
  dispatch({
    type: action_types.OVERALL_FINANCE,
    data: message,
  });
};

export const getFinanceDetail = (id) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/hrms.api.emp_finance_details?empid=${id}`);
  dispatch({
    type: action_types.FINANACE_DETAIL,
    data: message,
  });
};
