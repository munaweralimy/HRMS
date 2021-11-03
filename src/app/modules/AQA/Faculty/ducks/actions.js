import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getFaculty = (status) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_faculty_list${status ? '?status='+status : ''}`);
        dispatch({
            type: action_types.FACULTY_LIST,
            data: message,
        });
    };
};

export const getFacultyList = (status, page, limit) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_faculty_program_list_pagination${status ? '?status='+status : ''}&order=DESC${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.FACULTY_LIST,
            data: message,
        });
    };
};


export const getSingleFaculty = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.faculty_single_record_list_status?name=${code}`);
        dispatch({
            type: action_types.SINGLE_FACULTY,
            data: message,
        });
    };
};

export const getProgrmList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Institution Faculty Program?filters=[["status", "=", "Active"]]&fields=["name", "program_name", "ineffective_date"]`);
        dispatch({
            type: action_types.PROGRAM_LIST,
            data: data,
        });
    };
};