import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";
import moment from 'moment';

export const getProgrammes = (status) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_faculty_Program_list?status=${status}`);
        dispatch({
            type: action_types.PROGRAMME_LIST,
            data: message,
        });
    };
};

export const getProgramList = (status, page, limit, order, orderby) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_faculty_program_list_pagination${status ? '?status='+status : ''}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.PROGRAMME_LIST,
            data: message,
        });
    };
};


export const getProgrammesByFaculty = (name) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_expired_licenses${name && '?faculty_name='+name}`);
        dispatch({
            type: action_types.PROGRAMME_LIST_FAC,
            data: message,
        });
    };
};

export const getFilterProgrammes = (name) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_expired_licenses_list?m_filter=${name}`);
        dispatch({
            type: action_types.PROGRAMME_LIST_FILTER,
            data: message,
        });
    };
};

export const getSingleProgram = (name) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_program_details?name=${name}`);
        dispatch({
            type: action_types.SINGLE_PROGRAMME,
            data: message,
        });
    };
};

export const emptyProgram = (name) => {
    return (dispatch) => {
        dispatch({
            type: action_types.EMPTY_PROGRAMME,
            data: [],
        });
    };
};

export const emptyProgramsList = (name) => {
    return (dispatch) => {
        dispatch({
            type: action_types.EMPTY_PROGRAMME_LIST,
            data: [],
        });
    };
};





export const getModules = () => {
    return async(dispatch) => {
        const {
            data: { data },
            // http://cms2dev.limkokwing.net/api/resource/AQA Module?filters=[["status","=","Active"]]&fields=["name","module_code","module_name","type","credit","hours","module_fee","fee_currency"]

 
        } = await axios.get(`${apiresource}/AQA Module?filters=[["status","=","Active"]]&fields=["*"]`);
        dispatch({
            type: action_types.ALL_MODULES,
            data: data,
        });
    };
};