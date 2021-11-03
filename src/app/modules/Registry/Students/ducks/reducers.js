import * as action_types from './constants';

const initialState = {
  studentList: [],
  pendingList: [],
  studentAppData: {},
  timetableData: [],
  requestData: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.STUDENTS_LIST:
      return { ...state, studentList: data };
    case action_types.PENDING_LIST:
      return { ...state, pendingList: data };
    case action_types.STUDENT_APP_DETAIL:
      return { ...state, studentAppData: data };
    case action_types.EMPTY_STUDENT_APP:
      return { ...state, studentAppData: data };
    case action_types.TIME_TABLE:
      return { ...state, timetableData: data };
    case action_types.REQUEST_DATA:
      return { ...state, requestData: data };
    default:
      return state;
  }
};
