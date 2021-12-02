import axios from './axiosInterceptor'
import { apiMethod, apiresource } from '../configs/constants';

export const getInstitutions=()=> {
    return axios.get(`${apiresource}/Institutions`);
}

export const createFaculty=(data)=>{
    return axios.post(`${apiresource}/Institution Faculty`,data)
}