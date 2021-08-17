import * as action_types from './constant';
const initialState = {
  tabClose: false,
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.CHANGE_TAB:
      return { ...state, tabClose: data };
    default:
      return state;
  }
};
