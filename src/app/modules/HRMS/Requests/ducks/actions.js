import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiMethod, apiresource } from "../../../../../configs/constants";

export const getRequestPending = (page, sort, limit) => {
    return async (dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_request_listing?&status=Staff Request${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_PENDING,
            data: message,
        });
    };
};

export const getRequestArchive = (page, sort, limit) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_request_listing?status=Archive${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_ARCHIVE,
            data: message,
        });
    };
};

export const getYourRequest = (page, sort, limit) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_request_listing?status=My Request${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_YOUR_REQUEST,
            data: message,
        });
    };
};

export const getFormFields = () => {
    return async (dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_form_fields`);
        dispatch({
            type: action_types.FORMS_LIST,
            data: message,
        });
    };
};

export const getRequestDetails = (id) => async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_staff_requests?staff_id=${id}`);
    dispatch({
      type: action_types.REQUEST_DATA,
      data: message,
    });
  };
