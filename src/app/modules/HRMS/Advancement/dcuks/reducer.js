import * as action_types from './constant';

const initialState = {
  addJob: false,
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.ADD_JOB:
      return { ...state, addJob: data };
    default:
      return state;
  }
};
