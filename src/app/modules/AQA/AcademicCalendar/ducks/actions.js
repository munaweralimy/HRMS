import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getTermList = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_term_list`);
        dispatch({
            type: action_types.TERM_LIST,
            data: message,
        });
    };
};

export const getCalendarCoursesList = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_calander_list`);
        dispatch({
            type: action_types.CALENDAR_COURSE_LIST,
            data: message,
        });
    };
};


export const getTermDetail = (params) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_term_detail?name=${params}`);
        dispatch({
            type: action_types.TERM_DETAIL,
            data: message,
        });
    };
};

export const getCourseGroupType = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Course Group Type`);
        dispatch({
            type: action_types.COURSE_GROUP_TYPE,
            data: data,
        });
    };
};

export const getTermDetailProgrammeList = (params) => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Institution Faculty Program?fields=["name","program_code","program_name","faculty_code","status"]&filter=["program_level":${params}]`);
        dispatch({
            type: action_types.TERM_DETAIL_PROGRAMME_LIST,
            data: data,
        });
    };
};

export const getProgrammeDropList = (params = 'Degree') => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Institution Faculty Program?filter=["program_level":${params}]`);
        dispatch({
            type: action_types.PROGRAMME_DROP_LIST,
            data: data,
        });
    };
};