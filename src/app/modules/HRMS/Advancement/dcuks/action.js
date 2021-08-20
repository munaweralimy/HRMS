import * as action_types from './constant';

export const onAddJob = (bol) => (dispatch) => {
  dispatch({
    type: action_types.ADD_JOB,
    data: bol,
  });
};
