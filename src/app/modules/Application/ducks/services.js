import axios from '../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../configs/constants';

export const clockINOUT = (id, log) => {
  return axios.post(`${apiMethod}/hrms.last_clock.test_previous_checkin_out?employee_id=${id}&logtype=${log}`);
};

export const lateClockOutReason = (data) => {
  return axios.post(`${apiresource}/HRMS Late Clock Out`, data);
};
