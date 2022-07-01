import * as action_types from "./constants";

const initialState = {
    overallTaskData: [],
    overallEmployeeData: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.SEARCH_TASK:
            return {...state, overallTaskData: data };

        case action_types.SEARCH_EMPLOYEE:
            return {...state, overallEmployeeData: data };
            
        default:
            return state;
    }
};