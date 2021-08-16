import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getRequestListingPending = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_request_listing?status=Pending`);
        dispatch({
            type: action_types.REQUEST_LIST_PENDING,
            data: message,
        });
    };
};

export const getRequestListingArchive = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_request_listing?status=Archive`);
        dispatch({
            type: action_types.REQUEST_LIST_ARCHIVE,
            data: message,
        });
    };
};

export const getRequestListing = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_request_listing?status=Your Request`);
        dispatch({
            type: action_types.REQUEST_LIST_YOUR_REQUEST,
            data: message,
        });
    };
};
