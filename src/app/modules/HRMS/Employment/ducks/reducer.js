import * as action_types from './constant';

const initialState = {
  teamList: {},
  memberList: {},
  teamDetails: {},
  empDetails: {}
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.TEAM_LIST:
      return { ...state, teamList: data };
    case action_types.MEMBER_LIST:
      return { ...state, memberList: data };
    case action_types.TEAM_DETAILS:
      return { ...state, teamDetails: data };
    case action_types.EMPLOYEE_DETAILS:
      return { ...state, empDetails: data };
      case action_types.EMPLOYEE_LIST:
    return { ...state, emplist: data };
    case action_types.EMPLOYEE_CARD:
      return { ...state, empcard: data };
      
    default:
      return state;
  }
};
