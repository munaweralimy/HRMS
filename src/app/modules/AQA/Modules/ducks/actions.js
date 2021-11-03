import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getModules = (status) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.module_list${status ? '?status='+status : ''}`);
        dispatch({
            type: action_types.MODULE_LIST,
            data: message,
        });
    };
};


export const getSingleModule = (code) => {
    return async(dispatch) => {
        const {
            data: { message },

        } = await axios.get(`${apiMethod}/aqa.api.module_single_record_list_status?name=${code}`);
        dispatch({
            type: action_types.SINGLE_MODULE,
            data: message,
        });
    };
};