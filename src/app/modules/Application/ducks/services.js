import axios from '../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../configs/constants';

export const clockINOUT = (id, log, todayDateTime) => {
  return axios.post(
    `${apiMethod}/hrms.api.employee_check_in_out?employee=${id}&log_type=${log}&attendance_date=${todayDateTime}`,
  );
};
