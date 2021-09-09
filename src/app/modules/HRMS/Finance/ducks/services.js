import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const updateAssets = (id, payload) => {
  return axios.put(`${apiresource}/HRMS EMP Assets/${id}`, payload);
};
