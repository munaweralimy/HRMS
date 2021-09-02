import axios from '../../../../../services/axiosInterceptor';
import { apiresource } from '../../../../../configs/constants';

export const updateAttendance = (id, payload) => {
  return axios.put(`${apiresource}/Attendance/${id}`, payload);
};
