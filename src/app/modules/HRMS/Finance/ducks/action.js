import * as action_types from './constant';

export const closeAllOpenForms = (bol) => {
  return (dispatch) => {
    dispatch({
      type: action_types.CHANGE_TAB,
      data: bol,
    });
  };
};
