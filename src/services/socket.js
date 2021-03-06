import { baseUrl } from "../configs/constants";
import authInterceptors from "./axiosInterceptor";

export const getTeamUpdates = () => {
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
  return authInterceptors.get(
    `${baseUrl}${apiMethod}/marketing.api.get_message?doc_name=AP000160&start_date=2021-01-01&end_date=${date}`
  );
};
