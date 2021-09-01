import * as action_types from './constants';

const initialState = {
  overallAttendance: [],
  overallAttendanceList: [],
  teamAttendance: [],
  myAttendance: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.OVERALL_ATTENDANCE:
      return { ...state, overallAttendance: data };
    case action_types.OVERALL_ATTENDANCE_LIST:
      return { ...state, overallAttendanceList: data };
    case action_types.TEAM_ATTENDANCE:
      return { ...state, teamAttendance: data };
    case action_types.MY_ATTENDANCE:
      return { ...state, myAttendance: data };
    default:
      return state;
  }
};
