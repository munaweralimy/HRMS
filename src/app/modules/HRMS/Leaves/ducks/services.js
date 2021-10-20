import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const updateCarryForward = (id) => {
    return axios.get(`${apiMethod}/hrms.leaves_api.change_carry_forwarded_leaves?employee_id=${id}`);
};