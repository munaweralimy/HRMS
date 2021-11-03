import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getScholarshipList = (status) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_scholarship_names?status=${status}`);
        dispatch({
            type: action_types.SCHOLARSHIP_LIST,
            data: message,
        });
    };
};

export const getScholarshipListPg = (status, page, limit, order, orderby) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_scholarship_names_pagination${status ? '?status='+status : ''}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.SCHOLARSHIP_LIST,
            data: message,
        });
    };
};


export const getScholarshipTypeDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Scholarship Type`);
        dispatch({
            type: action_types.SCHOLARSHIP_TYPE_DROP,
            data: data,
        });
    };
};



export const getSingleScholorshipData = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_single_scholarship_details?name=${code}`);
        dispatch({
            type: action_types.SCHOLARSHIP_SINGLE_DATA,
            data: message,
        });
    };
};

export const getOutstandingPaymentList = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_outstanding_payments?name=${code}`);
        dispatch({
            type: action_types.OUTSTANDING_PAYMENT,
            data: message,
        });
    };
};

export const getTotalOutstandingPayment = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_outstanding_total?name=${code}`);
        dispatch({
            type: action_types.OUTSTANDING_TOTAL_PAYMENT,
            data: message,
        });
    };
};

export const getStudentsList = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_scholarship_student_list?name=${code}`);
        dispatch({
            type: action_types.STUDENT_LIST,
            data: message,
        });
    };
};