import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const createRequest = (body) => {
    return axios.post(`${apiresource}/HRMS Form Request`, body);
};

export const cancelRequest = (id) => {
    return axios.put(`${apiresource}/HRMS Form Request/${id}`, {status:"Inactive"});
};

export const updateRequest = (id, body) => {
    return axios.put(`${apiresource}/HRMS Form Request/${id}`, body);
};


export const getRequest = (name) => {
    return axios.get(`${apiresource}/HRMS Form Listing/${name}`);
};

export const getApproverLead = (id) => {
    return axios.get(`${apiMethod}/hrms.api.request_4_details?employee_id=${id}`);
};
